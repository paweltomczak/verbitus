import { fetchCategories, fetchPostById, fetchTags } from '@/app/lib/data';
import EditPostForm from '@/app/ui/dashboard/posts/EditPostForm';
import { QueryResultRow } from '@vercel/postgres';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPostById(id);
  const suggestedTags = await fetchTags();
  const categories = await fetchCategories();

  return (
    <EditPostForm
      post={post}
      suggestedTags={suggestedTags}
      categories={categories}
    />
  );
}
