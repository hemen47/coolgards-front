import * as React from "react";
import { useContext } from "react";
import { AlertContext } from "../_app";
import styles from "./post.module.scss";
import formatDistance from "date-fns/formatDistance";
import parse from "html-react-parser";
import Link from "next/link";
import Button from "@mui/material/Button";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Head from "next/head";
import { format } from "date-fns";

export default function Post({ data, error, relatedPosts }) {
  const { setError } = useContext(AlertContext);

  if (error) {
    setError(error);
  }

  const generateReadableDate = (date) => {
    return formatDistance(new Date(date), new Date())
  }

  const formattedPublishDate = data?.data?.createdAt ?
      format(new Date(data.data.createdAt), 'yyyy-MM-dd') : '';

  const formattedModifiedDate = data?.data?.updatedAt ?
      format(new Date(data.data.updatedAt), 'yyyy-MM-dd') : formattedPublishDate;

  return (
      <>
        <Head>
          <title>{data?.data.title ? `${data.data.title} | CoolGards Cold Compression Therapy` : 'CoolGards News'}</title>
          <meta name="description" content={data?.data.excerpt || `Learn about ${data?.data.title} and how cold compression therapy can help with recovery and pain management.`} />
          <meta name="keywords" content={`${data?.data.tags?.join(', ')}, cold compression therapy, recovery, inflammation reduction`} />
          <link rel="canonical" href={`https://coolgards.com/news/${data?.data.slug}`} />
          <meta property="og:title" content={data?.data.title} />
          <meta property="og:description" content={data?.data.excerpt || `Learn about ${data?.data.title} and how cold compression therapy can help with recovery and pain management.`} />
          <meta property="og:url" content={`https://coolgards.com/news/${data?.data.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={data?.data.imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data?.data.title} />
          <meta name="twitter:description" content={data?.data.excerpt || `Learn about ${data?.data.title} and how cold compression therapy can help with recovery and pain management.`} />
          <meta name="twitter:image" content={data?.data.imageUrl} />
        </Head>

        {/* JSON-LD structured data for article */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": data?.data.title,
                "image": [data?.data.imageUrl],
                "datePublished": data?.data.createdAt,
                "dateModified": data?.data.updatedAt || data?.data.createdAt,
                "author": {
                  "@type": "Organization",
                  "name": "CoolGards",
                  "url": "https://coolgards.com"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "CoolGards",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://coolgards.com/logo.png"
                  }
                },
                "description": data?.data.excerpt,
                "keywords": data?.data.tags?.join(", ")
              })
            }}
        />

        <div className={styles.container}>
          <article itemScope itemType="https://schema.org/NewsArticle">
            <div className={styles.header}>
              <img
                  className={styles.image}
                  src={data?.data.imageUrl}
                  alt={`${data?.data.title} - Cold Compression Therapy`}
                  width="800"
                  height="500"
                  itemProp="image"
              />
              <div className={styles.titleContainer}>
                <h1 className={styles.title} itemProp="headline">{data?.data.title}</h1>
                <div className={styles.metaInfo}>
                  <time dateTime={formattedPublishDate} itemProp="datePublished" className={styles.date}>
                    Published: {formattedPublishDate}
                  </time>
                  {data?.data.updatedAt && data?.data.updatedAt !== data?.data.createdAt && (
                      <time dateTime={formattedModifiedDate} itemProp="dateModified" className={styles.date}>
                        Updated: {formattedModifiedDate}
                      </time>
                  )}
                  <p className={styles.readTime}>
                    {Math.ceil((data?.data.content?.length || 0) / 1000)} min read
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.content} itemProp="articleBody">
              <div className="m-8">{parse(data?.data.content || '')}</div>
            </div>

            <div className={styles.tagContainer}>
              {data?.data.tags?.map((tag) => {
                return (
                    <Link href={`/news/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} key={tag} className={styles.tags}>
                      {tag}
                    </Link>
                );
              })}
            </div>

            {/* Related articles section */}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className={styles.relatedPosts}>
                  <h2>Related Articles</h2>
                  <div className={styles.relatedPostsGrid}>
                    {relatedPosts.map(post => (
                        <Link href={`/news/${post.slug}`} key={post._id} className={styles.relatedPostCard}>
                          <img src={post.imageUrl} alt={post.title} width="150" height="100" />
                          <h3>{post.title}</h3>
                        </Link>
                    ))}
                  </div>
                </div>
            )}

            <div className={styles.navigation}>
              <Link href="/news">
                <Button
                    fullWidth
                    variant="standard"
                    sx={{ margin: "1rem", fontSize: "1.5rem" }}
                    aria-label="Return to news listing"
                >
                  <ReplyOutlinedIcon sx={{ marginRight: "1rem" }} />
                  Go Back to News
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
        `${process.env.BASE_URL}/posts/${context.params.slug}`
    );
    const data = await res.json();

    // Fetch related posts based on tags
    let relatedPosts = [];
    if (data?.data?.tags && data.data.tags.length > 0) {
      const relatedRes = await fetch(
          `${process.env.BASE_URL}/posts?tags=${data.data.tags.join(',')}&limit=3&exclude=${data.data._id}`
      );
      const relatedData = await relatedRes.json();
      relatedPosts = relatedData.data || [];
    }

    return {
      props: {
        data,
        relatedPosts
      }
    };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
