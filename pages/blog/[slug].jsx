import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../_app";
import styles from "./post.module.scss";
import formatDistance from "date-fns/formatDistance";
import parse from "html-react-parser";
import Link from "next/link";
import Button from "@mui/material/Button";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

export default function Post({ data, error }) {
  const { setError } = useContext(AlertContext);

  if (error) {
    setError(error);
  }

  return (
    <div className={styles.container}>
      <article>
        <div className={styles.header}>
          <img
            className={styles.image}
            src={data?.data.imageUrl}
            alt={data?.data.title}
          />
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{data?.data.title}</h1>
            <h2 className={styles.writer}>by {data?.data.writerName}</h2>
            <p className={styles.date}>
              {formatDistance(new Date(data?.data.createdAt), new Date())} ago
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <div className="m-8">{parse(data?.data.content)}</div>
        </div>
        <div className={styles.tagContainer}>
          {data?.data.tags.map((tag) => {
            return <p className={styles.tags} key={tag}> {tag}</p>;
          })}
        </div>
        <div>
          <Link href="/blog">
            <Button
                fullWidth
                variant="standard"
                sx={{ margin: "1rem", fontSize: "1.5rem" }}
            >
              <ReplyOutlinedIcon sx={{ marginRight: "1rem" }} />
              Go Back to Blog
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/${context.params.slug}`
    );
    const data = await res.json();
    return { props: { data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
