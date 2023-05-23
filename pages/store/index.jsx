import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AlertContext, UserContext } from "../_app";
import { useRouter } from "next/router";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./store.module.scss";
import Link from 'next/link'


export default function Store({ data, error }) {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (error) {
    setError(error);
  }

  return (
    <div className={styles.container}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3}}>
        <Masonry columnsCount={5} gutter="20px">
          {data.data?.map((item) => {
            return (
              <Link key={item._id} className={styles.card} href={'/store/'+item.slug}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={
                    hovered === item._id ? styles.hovered : styles.released
                  }
                  onMouseOver={() => setHovered(item._id)}
                  onMouseLeave={() => setHovered("")}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                  <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200 bg-opacity-70">
                    {item.title}
                  </div>
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}products`);
    const data = await res.json();
    return { props: { data: data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
