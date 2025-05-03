import * as React from 'react';
import { useContext, useState } from 'react';
import { AlertContext } from '../_app';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styles from './news.module.scss';
import Link from 'next/link';
import Head from 'next/head';

export default function News({ data, error }) {
  const { setError } = useContext(AlertContext);
  const [hovered, setHovered] = useState('');

  if (error) {
    setError(error);
  }

  // Extract categories and tags for structured data
  const categories = [...new Set(data?.data?.flatMap(item => item.tags || []))];

  return (
    <>
      <Head>
        <title>Cold Compression Therapy News & Updates | CoolGards</title>
        <meta
          name="description"
          content="Stay updated with the latest news on cold compression therapy, recovery techniques, and CoolGards product innovations for faster healing and reduced inflammation."
        />
        <meta
          name="keywords"
          content="cold compression therapy news, recovery techniques, post-surgery recovery, sports injury recovery, CoolGards updates"
        />
        <link rel="canonical" href="https://coolgards.com/news" />
        <meta property="og:title" content="Cold Compression Therapy News & Updates | CoolGards" />
        <meta
          property="og:description"
          content="Latest news and updates on cold compression therapy technology and recovery techniques from CoolGards."
        />
        <meta property="og:url" content="https://coolgards.com/news" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* JSON-LD structured data for news page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            headline: 'Cold Compression Therapy News & Updates',
            description:
              'Stay updated with the latest news on cold compression therapy and recovery techniques',
            url: 'https://coolgards.com/news',
            about: {
              '@type': 'Thing',
              name: 'Cold Compression Therapy',
            },
            keywords: categories.join(', '),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: data?.data?.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://coolgards.com/news/${item.slug}`,
                name: item.title,
              })),
            },
          }),
        }}
      />

      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Cold Compression Therapy News & Updates</h1>
        <p className={styles.newsIntro}>
          Discover the latest developments in cold compression therapy, recovery techniques, and how
          CoolGards products are helping patients and athletes recover faster with reduced pain and
          inflammation.
        </p>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3 }}>
          <Masonry columnsCount={5} gutter="20px">
            {data?.data?.map(item => {
              return (
                <Link
                  key={item._id}
                  className={styles.card}
                  href={'/news/' + item.slug}
                  onMouseOver={() => setHovered(item._id)}
                  onMouseLeave={() => setHovered('')}
                  aria-label={`Read more about ${item.title}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} - Cold Compression Therapy Article`}
                    className={hovered === item._id ? styles.hovered : styles.released}
                    width="400"
                    height="300"
                    loading="lazy"
                  />
                  <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{item.title}</h2>
                    {item.excerpt && <p className={styles.excerpt}>{item.excerpt}</p>}
                    <time
                      dateTime={new Date(item.createdAt).toISOString().split('T')[0]}
                      className={styles.date}
                    >
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <p className={hovered === item._id ? styles.readMoreHover : styles.readMore}>
                      read more...
                    </p>
                  </div>
                </Link>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/posts`);
    const data = await res.json();

    // Add excerpt generation if not provided by API
    if (data && data.data) {
      data.data = data.data.map(post => {
        if (!post.excerpt) {
          // Create excerpt from content by stripping HTML and limiting length
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = post.content;
          const textContent = tempDiv.textContent || tempDiv.innerText || '';
          post.excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');
        }
        return post;
      });
    }

    return {
      props: {
        data: data,
      },
    };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
