import { fetchTags } from '@/app/lib/data';
import CreatePostForm from '@/app/ui/dashboard/posts/CreatePostForm';
import { QueryResultRow } from '@vercel/postgres';

export default async function Page() {
  const suggestedTags: { id: number; name: string }[] = (await fetchTags()).map(
    (tag: QueryResultRow) => ({
      id: tag.id,
      name: tag.name,
    })
  );

  return <CreatePostForm suggestedTags={suggestedTags} />;
}
