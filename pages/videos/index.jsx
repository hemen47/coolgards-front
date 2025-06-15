import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Videos() {
  // Define meta content for SEO
  const pageTitle = 'Video Library | CoolGards';
  const pageDescription =
    'Explore our collection of informative videos on cold compression therapy, recovery techniques, and rehabilitation strategies.';
  const canonicalUrl = 'https://coolgards.com/videos';
  const ogImage = 'https://coolgards.com/cover.webp';

  // State for videos
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Categories for filtering videos
  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'science', name: 'Science' },
  ];

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube-videos');

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.videos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos by category
  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter(video => video.snippet.tags && video.snippet.tags.includes(selectedCategory));

  // Format date
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format views count
  const formatViews = views => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  // Format duration
  const formatDuration = duration => {
    const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '00:00';

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Structured data for VideoGallery
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.slice(0, 10).map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: video?.snippet?.title,
        description: video?.snippet?.description,
        thumbnailUrl: video?.snippet?.thumbnails?.high?.url,
        uploadDate: video?.snippet?.publishedAt,
        contentUrl: `https://www.youtube.com/watch?v=${video?.id?.videoId || video?.id}`,
        embedUrl: `https://www.youtube.com/embed/${video?.id?.videoId || video?.id}`,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="CoolGards" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional meta tags for better SEO */}
        <meta
          name="keywords"
          content="cold compression therapy, recovery videos, tutorials, rehabilitation"
        />
        <meta name="author" content="CoolGards Team" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white pt-32 pb-10">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Cold Compression Therapy Videos
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Watch expert demonstrations, tutorials, and insights on recovery techniques and
              rehabilitation
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Channel Stats Section */}
          <div className="mb-12 bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="mr-6 relative">
                  <Image
                    src="/logo.png"
                    alt="CoolGards Channel"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">CoolGards</h2>
                  <p className="text-gray-600">Cold Compression Therapy Experts</p>
                </div>
              </div>
              <div className="flex space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{videos.length}</div>
                  <div className="text-sm text-gray-600">Videos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Explore Topics</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="mb-16">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
                <p>Please try again later or check your API configuration.</p>
              </div>
            ) : (
              <>
                {filteredVideos.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 4v16M17 4v16M3 8h18M3 16h18"
                      ></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-600">No videos found in this category</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map(video => {
                      const videoId = video.id?.videoId || video.id;
                      const thumbnail = video.snippet?.thumbnails?.high?.url;
                      const title = video.snippet?.title;
                      const publishedAt = new Date(video.snippet?.publishedAt);

                      return (
                        <div
                          key={videoId}
                          className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                          onMouseEnter={() => setHoveredCard(videoId)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <a
                            href={`https://www.youtube.com/watch?v=${videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative h-52 overflow-hidden"
                          >
                            <Image
                              src={thumbnail}
                              alt={title}
                              layout="fill"
                              objectFit="cover"
                              className={`transition-transform duration-500 ${
                                hoveredCard === videoId ? 'scale-110' : 'scale-100'
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {video.snippet?.tags?.[0] || 'Recovery'}
                              </span>
                            </div>
                            <div className="absolute bottom-0 right-0 p-4">
                              <span className="inline-block bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {video.contentDetails?.duration
                                  ? formatDuration(video.contentDetails.duration)
                                  : '00:00'}
                              </span>
                            </div>
                          </a>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                              {title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {video.snippet?.description ||
                                'Watch this video to learn more about cold compression therapy techniques and recovery strategies.'}
                            </p>

                            <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                  C
                                </div>
                                <span className="ml-2 text-sm text-gray-600">CoolGards</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(publishedAt)}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`border-t border-gray-100 p-4 flex justify-between items-center transition-opacity duration-300 ${
                              hoveredCard === videoId ? 'opacity-100' : 'opacity-70'
                            }`}
                          >
                            <span className="text-sm text-gray-500">
                              Go to our youtube channel:
                            </span>
                            <span
                              className={`cursor-pointer text-blue-600 font-medium flex items-center transition-all duration-300 ${
                                hoveredCard === videoId ? 'translate-x-1' : ''
                              }`}
                            >
                              Watch now
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
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Newsletter Section */}
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 shadow-xl mb-16">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Stay Updated on Recovery Science
                </h2>
                <p className="text-blue-100">
                  Subscribe to our channel and get notified when we upload new videos on cold
                  compression therapy.
                </p>
              </div>
              <div className="md:w-1/3">
                <a
                  href="https://www.youtube.com/channel/UCTjMtuWY7slpzQFFL_BOS1Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white text-blue-600 px-6 py-3 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Subscribe to Channel
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Rehabilitation', 'Sports Injuries', 'Cold Therapy', 'Post-Surgery'].map(
                category => (
                  <div
                    key={category}
                    className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-medium text-gray-800">{category}</h3>
                    <p className="text-sm text-gray-500 mt-1">Videos</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add getServerSideProps for fetching data on each request
export async function getServerSideProps() {
  return {
    props: {
      // Props will be passed from the API route
    },
  };
}
