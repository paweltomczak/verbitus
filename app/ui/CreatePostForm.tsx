'use client';

import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from './Button';
import { createPost } from '../lib/actions';
import Message from './Message';
import { useFormState } from 'react-dom';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const setContentHandler = (value: string) => {
    setContent(value);
  };

  async function formAction(_: any, formData: FormData) {
    formData.append('content', content);
    const result = await createPost(undefined, formData);
    if (result.type === 'success') {
      setTitle('');
      setContent('');
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill theme='snow' value={content} onChange={setContentHandler} />
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
