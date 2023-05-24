import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AlertContext, UserContext } from "../_app";
import { useRouter } from "next/router";
import styles from "./product.module.scss";
import ImageGallery from 'react-image-gallery';
import parse from "html-react-parser";
import "react-image-gallery/styles/scss/image-gallery.scss";

import Button from "@mui/material/Button";
import Link from "next/link";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

export default function Product({ data, error }) {
  const router = useRouter();
  const { setError } = useContext(AlertContext);

  const sliderItemsGenerator = (urls) => {
    return urls.map((url) =>{
      return {
        original: url,
        thumbnail: url,
        thumbnailClass: styles.shadow
      }
    })
  }

  useEffect(() => {
    return () => {
      console.log('data', data)
    };
  }, [data]);


  if (error) {
    setError(error);
  }

  return (
    <div className={styles.container}>
      <article>
        <div className={styles.header}>
          <div className={styles.slider}>
            <ImageGallery items={sliderItemsGenerator(data?.data?.imageUrls)}/>
          </div>
          <div className={styles.headerDetails}>
            <h1>{data?.data?.title}</h1>
            <Button fullWidth variant="contained" sx={{ margin: ".5rem", height: "50px" }}>
              Add to Cart
            </Button>
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
          <Link href="/store">
            <Button
                fullWidth
                variant="standard"
                sx={{ margin: "1rem", fontSize: "1.5rem" }}
            >
              <ReplyOutlinedIcon sx={{ marginRight: "1rem" }} />
              Go Back to Store
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
      `${process.env.NEXT_PUBLIC_BASE_URL}products/${context.params.slug}`
    );
    const data = await res.json();
    return { props: { data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
