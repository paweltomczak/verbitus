'use client';

import { useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '../../common/Button';
import { createPost } from '../../../lib/actions';
import Message from '../Message';
import { useFormState } from 'react-dom';
import ImageUload from './ImageUpload';
import Editor from './Editor';
import TagsInput from './TagsInput';
import CategorySelect from './CategorySelection';

export default function CreatePostForm({
  suggestedTags,
  categories,
}: {
  suggestedTags: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [imageSelected, setImageSelected] = useState(false);

  const fileInputRef = useRef(null);

  const setContentHandler = (value: string) => {
    setContent(value);
  };

  async function formAction(_: any, formData: FormData) {
    formData.append('content', content);
    formData.append('category', selectedCategory as string);
    formData.append('tags', JSON.stringify(tags));

    if ((fileInputRef.current as any)?.files?.[0]) {
      formData.append(
        'image',
        (fileInputRef.current as any).files[0],
        (fileInputRef.current as any).files[0].name
      );
    }

    const result = await createPost(undefined, formData);
    if (result.type === 'success') {
      setTitle('');
      setContent('');
      setTags([]);
      setSelectedCategory('');
      setImageSelected(false);
      if (fileInputRef.current) {
        (fileInputRef.current as HTMLInputElement).value = '';
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
        className='px-4 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-body'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor setContentHandler={setContentHandler} content={content} />
      <ImageUload
        fileInputRef={fileInputRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <TagsInput tags={tags} setTags={setTags} suggestedTags={suggestedTags} />
      <Button type='submit'>Publish</Button>
      {state.message && (
        <Message
          message={state.message}
          type={state.type as 'success' | 'error'}
        />
      )}
    </form>
  );
}
