import React from "react";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import { useCurrencyContext } from "@/context/currencies";

const Header = () => {
  const value = useCurrencyContext();
  const activeCurrency = value?.activeCurrency;

  const checkPrices = async () => {
    await fetch(`/api/check-crypto-prices`);
  };

  return (
    <div className={styles.container}>
      {activeCurrency && activeCurrency}
      <Button variant="outlined" endIcon={<CachedIcon />} onClick={checkPrices}>
        Check prices
      </Button>
    </div>
  );
};

export default Header;
