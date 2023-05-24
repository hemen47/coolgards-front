import * as React from "react";
import { useContext, useState } from "react";
import { AlertContext, UserContext } from "../_app";
import { useRouter } from "next/router";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./blog.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Blog({ data, error }) {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);
  const [hovered, setHovered] = useState("");

  if (error) {
    setError(error);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Welcome to our Blog</h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3 }}>
        <Masonry columnsCount={5} gutter="20px">
          {data.data?.map((item) => {
            return (
              <Link
                key={item._id}
                className={styles.card}
                href={"/blog/" + item.slug}
                onMouseOver={() => setHovered(item._id)}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={
                    hovered === item._id ? styles.hovered : styles.released
                  }
                />
                <div className={styles.titleContainer}>
                  <p className={styles.title}>{item.title}</p>
                  <p className={hovered === item._id ? styles.read : "hidden"}>
                    read more...
                  </p>
                </div>
              </Link>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}posts`);
    const data = await res.json();
    return { props: { data: data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
