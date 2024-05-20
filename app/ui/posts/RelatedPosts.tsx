import { fetchRelatedPosts } from '@/app/lib/data';
import BlogPost from './BlogPost';
import { Post } from '@/app/lib/interfaces';

export const RelatedPosts = async ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const relatedPosts = await fetchRelatedPosts(id, category);

  return (
    <section>
      <h3>
        <strong>Related Posts</strong>
        <div className='flex flex-col lg:flex-row pt-6 md:gap-6'>
          {relatedPosts.map((post) => (
            <BlogPost
              key={post.id}
              post={post as Post}
              isFeatured={false}
              isRelated={true}
              query=''
            />
          ))}
        </div>
      </h3>
    </section>
  );
};
