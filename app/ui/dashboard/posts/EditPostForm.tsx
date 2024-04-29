'use client';

import { useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '@/app/ui/common/Button';
import { updatePost } from '@/app/lib/actions';
import Message from '@/app/ui/dashboard/Message';
import { useFormState } from 'react-dom';
import { Post } from '@/app/lib/interfaces';
import ImageUload from './ImageUpload';
import Editor from './Editor';
import TagsInput from './TagsInput';
import CategorySelect from './CategorySelection';

export default function EditPostForm({
  post,
  suggestedTags,
  categories,
}: {
  post: Post;
  suggestedTags: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState<string[]>(post.tags);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    post.category
  );
  const [imageSelected, setImageSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setContent(post.content);
  }, [post]);

  const setContentHandler = (value: string) => {
    setContent(value);
  };

  async function formAction(_: any, formData: FormData) {
    formData.append('content', content);
    formData.append('category', selectedCategory as string);
    formData.append('tags', JSON.stringify(tags));

    if (fileInputRef.current?.files?.[0]) {
      formData.append(
        'image',
        fileInputRef.current.files[0],
        fileInputRef.current.files[0].name
      );
    }

    if (post.image_url) {
      formData.append('image_url', post.image_url);
    }

    const result = await updatePost(post.id, undefined, formData);

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
        className='px-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-body'
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
      />
      <Editor setContentHandler={setContentHandler} content={content} />
      <ImageUload
        fileInputRef={fileInputRef}
        imageUrl={post.image_url}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <TagsInput tags={tags} setTags={setTags} suggestedTags={suggestedTags} />
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
