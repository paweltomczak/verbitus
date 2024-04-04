import { fetchPostById } from '@/app/lib/data';
import EditPostForm from '@/app/ui/dashboard/posts/EditPostForm';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPostById(id);

  return <EditPostForm post={post} />;
}
