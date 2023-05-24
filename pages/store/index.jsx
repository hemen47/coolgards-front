import * as React from "react";
import { useContext, useState } from "react";
import { AlertContext } from "../_app";
import styles from "./store.module.scss";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Store({ data, error }) {
  const { setError } = useContext(AlertContext);
  const [hovered, setHovered] = useState("");


  if (error) {
    setError(error);
  }

  return (
      <div className = {styles.mainContainer}>
        <h1 className={styles.mainTitle}>Welcome to our Store</h1>
        <div className={styles.container}>
          {data.data?.map((item) => {
            return (
                <div
                    key={item._id}
                    className={hovered === item._id ? styles.hoveredCard : styles.card}
                    onMouseEnter={() => setHovered(item._id)}
                    onMouseLeave={() => setHovered("")}
                >
                  <img
                      src={item?.imageUrls[0]}
                      alt={item?.title}
                      className={styles.image}
                  />
                  <div className={styles.details}>
                    <h1 className={styles.title}>{item.title}</h1>
                    <p className={styles.price}>{item.price} $</p>
                    <div className={styles.buttonContainer}>
                      <Button fullWidth variant="contained" sx={{ margin: ".5rem", height: "50px" }}>
                        Add to Cart
                      </Button>
                      <Link href={"/store/" + item.slug}>
                        <Button fullWidth variant="standard" sx={{ margin: ".5rem", fontSize: ".8rem", height: "50px" }}>
                          read more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
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
