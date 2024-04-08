import { fetchPostById, fetchTags } from '@/app/lib/data';
import EditPostForm from '@/app/ui/dashboard/posts/EditPostForm';
import { QueryResultRow } from '@vercel/postgres';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPostById(id);

  const tagsResult = await fetchTags();
  const suggestedTags = {
    suggestedTags: tagsResult.map((tag: QueryResultRow) => ({
      id: tag.id as number,
      name: tag.name as string,
    })),
  };

  return <EditPostForm post={post} suggestedTags={suggestedTags} />;
}
