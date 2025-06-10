import * as React from 'react';
import { useContext } from 'react';
import { AlertContext } from '../_app';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import RelatedProducts from '../../components/relatedProducts';

export default function Post({ data, error, relatedPosts }) {
  const { setError } = useContext(AlertContext);
  const router = useRouter();

  if (error) {
    setError(error);
  }

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-6 w-64 bg-blue-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article not found</h1>
          <p className="text-gray-600 mb-6">
            The article you&#39;re looking for doesn&#39;t exist or has been removed.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const article = data.data;

  // Format dates
  const publishDate = parseISO(article.createdAt);
  const modifiedDate = parseISO(article.updatedAt);

  const formattedPublishDate = format(publishDate, 'MMMM d, yyyy');
  const formattedModifiedDate = format(modifiedDate, 'MMMM d, yyyy');
  const isoPublishDate = format(publishDate, 'yyyy-MM-dd');
  const isoModifiedDate = format(modifiedDate, 'yyyy-MM-dd');

  // Calculate reading time (average reading speed: 200 words per minute)
  const wordCount = article.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Extract plain text excerpt for meta description (first 160 chars)
  const plainTextContent = article.content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const excerpt = plainTextContent.substring(0, 160) + (plainTextContent.length > 160 ? '...' : '');

  // Get absolute URL for the image
  const imageUrl = article.imageUrl.startsWith('http')
    ? article.imageUrl
    : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coolgards.com'}${article.imageUrl}`;

  // Get canonical URL
  const canonicalUrl = `https://coolgards.com/news/${article.slug}`;

  return (
    <>
      <Head>
        <title>{article.title} | CoolGards Cold Compression Therapy</title>
        <meta name="description" content={excerpt} />
        <meta
          name="keywords"
          content={`${
            article.tags?.join(', ') || ''
          }, cold compression therapy, recovery, inflammation, rehabilitation`}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={article.createdAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        {article.tags?.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      {/* JSON-LD structured data for article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            image: [imageUrl],
            datePublished: article.createdAt,
            dateModified: article.updatedAt,
            author: {
              '@type': 'Company',
              name: 'CoolGards',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CoolGards',
              logo: {
                '@type': 'ImageObject',
                url: 'https://coolgards.com/logo.png',
              },
            },
            description: excerpt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            keywords: article.tags?.join(', '),
          }),
        }}
      />

      <article className="pt-[5.5rem] pb-24 bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative">
          {/* Featured Image */}
          <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-900/70 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          </div>

          {/* Article Header Content */}
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-4xl mx-auto -mt-32 md:-mt-48 bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  layout="fill"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                {/* Title */}
                <h1
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
                  itemProp="headline"
                >
                  {article.title}
                </h1>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map(tag => (
                      <Link
                        href={`/news/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        key={tag}
                        className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                  {/* Divider */}
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {readingTime} min read
                  </span>
                  <span className="hidden md:inline-block">•</span>

                  {/* Publish Date */}
                  <time dateTime={isoPublishDate} itemProp="datePublished">
                    {formattedPublishDate}
                  </time>

                  {/* Updated Date (if different) */}
                  {article.updatedAt && article.updatedAt !== article.createdAt && (
                    <>
                      <span className="hidden md:inline-block">•</span>
                      <time dateTime={isoModifiedDate} itemProp="dateModified" className="italic">
                        Updated: {formattedModifiedDate}
                      </time>
                    </>
                  )}

                  {/* Reading Time */}
                  <span className="hidden md:inline-block">•</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 mt-12">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div className="prose prose-lg max-w-none" itemProp="articleBody">
              {parse(article.content || '')}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    canonicalUrl
                  )}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Share on Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    canonicalUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    canonicalUrl
                  )}&title=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(canonicalUrl);
                    alert('Link copied to clipboard!');
                  }}
                  className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  aria-label="Copy link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        {/*<div className="container mx-auto px-4 mt-16">*/}
        {/*  <div className="max-w-3xl mx-auto bg-blue-50 rounded-xl p-8">*/}
        {/*    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">*/}
        {/*      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">*/}
        {/*        {article.writerName?.charAt(0) || 'C'}*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">*/}
        {/*          {article.writerName}*/}
        {/*        </h3>*/}
        {/*        <p className="text-gray-600 mb-4">*/}
        {/*          Medical content writer specializing in cold compression therapy and recovery*/}
        {/*          techniques.*/}
        {/*        </p>*/}
        {/*        <div className="flex justify-center sm:justify-start space-x-4">*/}
        {/*          <a href="#" className="text-blue-600 hover:text-blue-800">*/}
        {/*            <svg*/}
        {/*              xmlns="http://www.w3.org/2000/svg"*/}
        {/*              width="20"*/}
        {/*              height="20"*/}
        {/*              viewBox="0 0 24 24"*/}
        {/*              fill="currentColor"*/}
        {/*            >*/}
        {/*              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />*/}
        {/*            </svg>*/}
        {/*          </a>*/}
        {/*          <a href="#" className="text-blue-600 hover:text-blue-800">*/}
        {/*            <svg*/}
        {/*              xmlns="http://www.w3.org/2000/svg"*/}
        {/*              width="20"*/}
        {/*              height="20"*/}
        {/*              viewBox="0 0 24 24"*/}
        {/*              fill="currentColor"*/}
        {/*            >*/}
        {/*              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />*/}
        {/*            </svg>*/}
        {/*          </a>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="container mx-auto px-4 mt-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                  <Link href={`/news/${post.slug}`} key={post._id} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            post.imageUrl.startsWith('http')
                              ? post.imageUrl
                              : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coolgards.com'}${
                                  post.imageUrl
                                }`
                          }
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.content?.replace(/<[^>]+>/g, ' ').substring(0, 120)}...
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {format(parseISO(post.createdAt), 'MMM d, yyyy')}
                          </span>
                          <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Experience the Benefits of Cold Compression
                </h2>
                <p className="text-blue-100">
                  Accelerate recovery, reduce pain and swelling with CoolGards&#39; advanced cold
                  compression therapy system.
                </p>
              </div>
              <div className="md:w-1/3 text-center">
                <Link
                  href="/products"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to News Button */}
        <div className="container mx-auto px-4 mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to News
          </Link>
        </div>

        <div className="container mx-auto px-4 mt-16">
          <h1>Related Products</h1>
          <RelatedProducts />
        </div>
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/posts/${context.params.slug}`);
    const data = await res.json();

    // Fetch related posts based on tags
    let relatedPosts = [];
    if (data?.data?.tags && data.data.tags.length > 0) {
      const relatedRes = await fetch(
        `${process.env.BASE_URL}/posts?tags=${data.data.tags.join(',')}&limit=3&exclude=${
          data.data._id
        }`
      );
      const relatedData = await relatedRes.json();
      relatedPosts = relatedData.data || [];
    }

    return {
      props: {
        data,
        relatedPosts,
      },
    };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
