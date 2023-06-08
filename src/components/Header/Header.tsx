import React from "react";
import styles from "./styles.module.css";
import IconButton from '@mui/material/IconButton';
import CachedIcon from "@mui/icons-material/Cached";
import { useCurrencyContext } from "@/context/currencies";

const Header = () => {
  const value = useCurrencyContext();
  const activeCurrency = value?.activeCurrency;

  const checkPrices = async () => {
    await fetch(`/api/check-crypto-prices`); // top-changed-symbols check-crypto-prices
  };

  return (
    <div className={styles.container}>
      {activeCurrency && activeCurrency}
      <IconButton aria-label="check-prices" onClick={checkPrices}>
        <CachedIcon />
      </IconButton>
    </div>
  );
};

export default Header;
