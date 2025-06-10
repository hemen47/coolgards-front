import * as React from 'react';
import { useContext, useState } from 'react';
import { AlertContext } from '../_app';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function News({ data, error }) {
  const { setError } = useContext(AlertContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  if (error) {
    setError(error);
  }

  // Function to extract excerpt from HTML content
  const extractExcerpt = (htmlContent, maxLength = 150) => {
    // Remove HTML tags to get plain text
    const plainText = htmlContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    // Truncate to desired length
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };

  // Format date
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>Cold Compression Therapy Blog | CoolGards</title>
        <meta
          name="description"
          content="Discover the latest insights on cold compression therapy, recovery techniques, and injury rehabilitation."
        />
        <link rel="canonical" href="https://coolgards.com/news" />
      </Head>

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-blue-600 text-white pt-32 pb-10">
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-repeat"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Cold Compression Therapy Insights
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Expert articles on recovery techniques, injury rehabilitation, and the science
                behind faster healing
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map(article => (
              <div
                key={article._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard(article._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href={`/news/${article.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredCard === article._id ? 'scale-110' : 'scale-100'
                      }`}
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Recovery
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {extractExcerpt(article.content)}
                    </p>
                  </div>
                </Link>

                <div
                  className={`border-t border-gray-100 p-4 flex justify-between items-center transition-opacity duration-300 ${
                    hoveredCard === article._id ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <span className="text-sm text-gray-500">{formatDate(article.createdAt)}</span>
                  <span
                    className={`cursor-pointer text-blue-600 font-medium flex items-center transition-all duration-300 ${
                      hoveredCard === article._id ? 'translate-x-1' : ''
                    }`}
                  >
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-600 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="md:flex items-center justify-between">
                <div className="mb-6 md:mb-0 md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Stay Updated on Recovery Science
                  </h2>
                  <p className="text-blue-100">
                    Get the latest articles and research on cold compression therapy delivered to
                    your inbox.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button className="bg-white text-blue-600 px-4 py-3 font-medium rounded-r-lg hover:bg-blue-50 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Explore Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Rehabilitation', 'Sports Injuries', 'Cold Therapy', 'Post-Surgery'].map(category => (
              <div
                key={category}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-gray-800">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">Articles</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/posts`);
    const data = await res.json();

    return { props: { data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
