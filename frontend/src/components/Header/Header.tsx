import React from "react";
import { useSelector } from "../../services/hooks";
import styles from "./styles.module.css";

const Header = () => {
  const selectedCurrency = useSelector(
    (state) => state.common.selectedCurrency,
  );
  return (
    <div className={styles.container}>
      <div className={styles.coin}>{selectedCurrency}</div>
    </div>
  );
};

export default Header;
