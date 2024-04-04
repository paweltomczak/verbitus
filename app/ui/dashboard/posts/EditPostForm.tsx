'use client';

import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '@/app/ui/Button';
import { updatePost } from '@/app/lib/actions';
import Message from '@/app/ui/Message';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/interfaces';
import Image from 'next/image';

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setContent(post.content);
  }, [post]);

  const setContentHandler = (value: string) => {
    setContent(value);
  };

  async function formAction(_: any, formData: FormData) {
    formData.append('content', content);

    if ((fileInputRef.current as any)?.files?.[0]) {
      formData.append(
        'image',
        (fileInputRef.current as any).files[0],
        (fileInputRef.current as any).files[0].name
      );
    }

    const result = await updatePost(post.id, undefined, formData);
    if (result.type === 'success') {
      setTitle('');
      setContent('');
      if (fileInputRef.current) {
        (fileInputRef.current as HTMLInputElement).value = '';
      }
    }
    return { message: result.message, type: result.type };
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImagePreviewUrl('');
    }
  };

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
      <ReactQuill theme='snow' value={content} onChange={setContentHandler} />
      <div className='flex items-center space-x-4'>
        <Image
          src={imagePreviewUrl || post.image_url}
          alt='Post image'
          width={64}
          height={64}
          className='rounded'
        />
        <input
          type='file'
          id='file'
          name='image'
          ref={fileInputRef}
          className='hidden'
          onChange={handleFileChange}
        />
        <label
          htmlFor='file'
          className='cursor-pointer inline-block bg-primary text-white font-medium py-2 px-4 rounded hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ml-2'
        >
          Upload File
        </label>
      </div>
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
