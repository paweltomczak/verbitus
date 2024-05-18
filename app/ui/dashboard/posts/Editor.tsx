import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from '../../common/loaders';

export default function Editor({
  setContentHandler,
  content,
}: {
  setContentHandler: (value: string) => void;
  content: string;
}) {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <div className='h-[300px]'></div>,
      }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      style={{ height: '250px', display: 'inline-block', width: '100%' }}
      theme='snow'
      value={content}
      onChange={setContentHandler}
      modules={modules}
    />
  );
}
