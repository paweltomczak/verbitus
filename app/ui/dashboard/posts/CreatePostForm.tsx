'use client';

import { useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '../../common/Button';
import { createPost, generateAIpost } from '../../../lib/actions';
import Message from '../Message';
import { useFormState } from 'react-dom';
import ImageUload from './ImageUpload';
import Editor from './Editor';
import TagsInput from './TagsInput';
import CategorySelect from './CategorySelection';
import { BoltIcon } from '@heroicons/react/24/solid';
import { DataForAI } from '@/app/lib/interfaces';

export default function CreatePostForm({
  suggestedTags,
  categories,
  dataForAI,
}: {
  suggestedTags: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  dataForAI: DataForAI;
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

  async function formAIAction() {
    const response = await generateAIpost(dataForAI);

    if (response?.type === 'success') {
      setTitle(response?.content.title);
      setContent(response?.content.content);
      setSelectedCategory(response?.content.category);
      setTags(response?.content.tags);
    }

    return {
      message: response?.message,
      type: response?.type,
    };
  }

  const [stateAI, formActionDispatchAI] = useFormState(formAIAction, {
    message: '',
    type: '',
  });

  return (
    <>
      <form action={formActionDispatchAI} className='mb-8'>
        <Button type='submit' otherClasses='bg-aiButton'>
          <BoltIcon className='w-5 h-5 mr-2' />
          Generate Post with AI
        </Button>
        {stateAI.message && (
          <Message
            message={stateAI.message}
            type={stateAI.type as 'success' | 'error'}
          />
        )}
      </form>
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
        <TagsInput
          tags={tags}
          setTags={setTags}
          suggestedTags={suggestedTags}
        />
        <Button type='submit'>Publish</Button>
        {state.message && (
          <Message
            message={state.message}
            type={state.type as 'success' | 'error'}
          />
        )}
      </form>
    </>
  );
}
