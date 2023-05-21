import React from "react";
import styles from "./styles.module.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";

export default function Home() {

  return (
    <div className={styles.section}>
      <div className={styles.item__header}>
        <Header />
      </div>
      <div className={styles.item__main}>
        <Main />
      </div>
      <div className={styles.item__sidebar}>
        <Sidebar />
      </div>
    </div>
  );
}
