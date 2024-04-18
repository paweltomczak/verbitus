import { fetchCategories, fetchTags } from '@/app/lib/data';
import CreatePostForm from '@/app/ui/dashboard/posts/CreatePostForm';
import { QueryResultRow } from '@vercel/postgres';

export default async function Page() {
  const suggestedTags = await fetchTags();
  const categories = await fetchCategories();

  return (
    <CreatePostForm suggestedTags={suggestedTags} categories={categories} />
  );
}
