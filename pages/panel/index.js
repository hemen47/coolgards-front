import React from "react";
import styles from "./panel.module.scss";
import { ax } from "../../utils/axios";

export default function Panel() {


  const search = () => {
    ax({
      url: "/api/panel/general",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
      .then((res) => {
        setMessages(res.data);
        setSelectedRow(res.data.data[0]);
      })
      .catch((e) => {
        setError(e.response?.data?.message || e.message);
      });
  };
  return (
    <div className="ml-56 max-[600px]:ml-20">
      <div className="flex justify-center">
        <h1 className="font-thin	text-gray-400	">Dashboard</h1>
      </div>
      <div className={styles.container}></div>
      <div className={styles.card}></div>
    </div>
  );
}
