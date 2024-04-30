import { PostSearchSkeletons } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { HomePagePosts } from '@/app/ui/posts/HomePagePosts';

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = searchParams?.query || '';
  return {
    title: query.length === 0 ? 'Privacy Policy' : `${query} - Search results`,
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || '';

  return query.length === 0 ? (
    <div className='max-w-6xl mx-auto px-6 pb-4'>
      <h2 className='text-center py-6 font-bold'>Privacy Policy</h2>
      <p className='py-4'>Effective Date: 04.29.2024</p>

      <p>
        Welcome to Verbitus (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
        We are committed to protecting your privacy while you visit our site.
        This Privacy Policy outlines our practices regarding the collection,
        use, and disclosure of information that we may receive through this
        site.
      </p>

      <h3 className='py-6'>1. Information We Collect</h3>

      <p>
        We do not collect any personal information from our visitors. We utilize
        Google AdSense and Google Analytics to analyze the usage of our site and
        serve ads based on site content. Additionally, we use a cookie to
        remember your theme preference (light or dark mode) to enhance your
        browsing experience.
      </p>
      <h3 className='py-6'>2. How We Use Information</h3>

      <p>
        As we do not collect personal information, there is no use of such data
        in any direct manner. Information collected by Google Analytics is used
        solely for the purpose of analyzing site traffic and user interaction
        with our content to improve our services. The theme preference cookie is
        used to maintain your display settings across different browsing
        sessions.
      </p>
      <h3 className='py-6'>3. Google AdSense and Google Analytics</h3>
      <p>
        Our site uses Google AdSense, a service provided by Google to display
        ads. Google AdSense may use cookies to display ads relevant to your
        interests. Google Analytics is employed to understand how visitors
        engage with our site. Both services may collect non-personally
        identifying information that your browser makes available whenever you
        visit a site. This information includes your Internet Protocol address,
        browser type, browser language, and the date and time of your query.
      </p>

      <h3 className='py-6'>4. Cookies</h3>

      <p className='pb-4'>
        We use a specific cookie to store your theme preference (light or dark).
        This cookie is essential for the customization of the site&apos;s visual
        theme according to your preference.
      </p>
      <p>
        Please note that while we use only one cookie directly, third-party
        services such as Google AdSense and Google Analytics may use cookies to
        provide and improve their services. You have the option to disable
        cookies in your browser settings, but this may affect how you are able
        to interact with our site as well as other websites.
      </p>

      <h3 className='py-6'>5. Social Media Plugins</h3>

      <p>
        We use social media plugins from platforms like Twitter and Facebook to
        allow you to share content directly from our site. These plugins may
        interact with your browser and collect information depending on your
        logged-in status on these social networks. We do not control the data
        collected by these third parties.
      </p>
      <h3 className='py-6'>6. Data Protection</h3>

      <p>
        We do not store any personal data as we do not collect such information.
        Therefore, there are no data storage practices applicable to our
        operations.
      </p>

      <h3 className='py-6'>7. Changes to This Privacy Policy</h3>

      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>

      <h3 className='py-6'>8. Consent</h3>

      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>
    </div>
  ) : (
    <Suspense fallback={<PostSearchSkeletons />}>
      <HomePagePosts query={query} />
    </Suspense>
  );
}
