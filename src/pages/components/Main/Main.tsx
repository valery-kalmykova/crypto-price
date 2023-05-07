import React from "react";
import styles from "./styles.module.css";
import InputAddLevel from "../InputAddLevel/InputAddLevel";
import ItemLevelPrice from "../ItemLevelPrice/ItemLevelPrice";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.item__title}>Current price:</p>
        <p className={styles.currentPrice}>100</p>
      </div>
      <div className={styles.item}>
        <p className={styles.item__title}>Add level:</p>
        <InputAddLevel placeholderT="USDT" />
      </div>
      <div className={styles.item}>
        <ItemLevelPrice />
      </div>
    </div>
  );
};

export default Main;
