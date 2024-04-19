import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Spinner } from '../../loaders';

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

  return (
    <ReactQuill
      style={{ height: '250px', display: 'inline-block', width: '100%' }}
      theme='snow'
      value={content}
      onChange={setContentHandler}
    />
  );
}
