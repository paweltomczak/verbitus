'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '@/app/ui/Button';
import { updatePost } from '@/app/lib/actions';
import Message from '@/app/ui/Message';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/interfaces';
import ImageUload from './ImageUpload';
import Editor from './Editor';

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setContent(post.content);
  }, [post]);

  const setContentHandler = (value: string) => {
    setContent(value);
  };

  async function formAction(_: any, formData: FormData) {
    formData.append('content', content);

    if (fileInputRef.current?.files?.[0]) {
      formData.append(
        'image',
        fileInputRef.current.files[0],
        fileInputRef.current.files[0].name
      );
    }

    const result = await updatePost(post.id, undefined, formData);
    if (result.type === 'success') {
      setTitle('');
      setContent('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    return { message: result.message, type: result.type };
  }

  const [state, formActionDispatch] = useFormState(formAction, {
    message: '',
    type: '',
  });

  return (
    <form action={formActionDispatch} className='space-y-4'>
      <input
        type='text'
        name='title'
        placeholder='Title'
        className='px-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
      />
      <Editor setContentHandler={setContentHandler} content={content} />
      <ImageUload fileInputRef={fileInputRef} imageUrl={post.image_url} />
      <Button type='submit'>Edit Post</Button>
      {state.message && (
        <Message
          message={state.message}
          type={state.type as 'success' | 'error'}
        />
      )}
    </form>
  );
}
