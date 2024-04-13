import { fetchCategories, fetchPostById, fetchTags } from '@/app/lib/data';
import EditPostForm from '@/app/ui/dashboard/posts/EditPostForm';
import { QueryResultRow } from '@vercel/postgres';
import { Post } from '../../lib/interfaces';
import Image from 'next/image';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPostById(id);

  return (
    <div className='w-full'>
      <h1 className='text-3xl md:text-5xl text-center font-bold md:m-10 py-8'>
        {post.title}
      </h1>
      <div className='relative w-full h-[300px] md:h-[500px]'>
        <Image
          src={post.image_url}
          alt={post.title}
          layout='fill'
          objectFit='cover'
          className='md:pb-10'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 text-center mt-6'>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
