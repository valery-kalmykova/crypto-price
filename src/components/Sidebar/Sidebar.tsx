import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import TextField from "@mui/material/TextField";
import { useCurrencyContext } from "@/context/currencies";
import { Switch } from "@mui/material";
import { getCurrencyList, sortArray } from "@/utils/shared";

function Sidebar() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [onlyWatched, setOnlyWatched] = useState(false);
  const value = useCurrencyContext();
  const { setActiveCurrency, setAllCurrencies } = useCurrencyContext();
  const currencies = value?.allCurrencies;
  let filteredCurrencies: any[] = [];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cussenciesData = await getCurrencyList();
        const sortedData = sortArray(cussenciesData);
        setAllCurrencies(sortedData);
        setAllCurrencies(cussenciesData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (onlyWatched) {
    filteredCurrencies = currencies.filter(
      (item: any) => item.checked === true
    );
  } else {
    filteredCurrencies = currencies.filter((item: any) =>
      item.symbol.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Whatchlist</div>
      <TextField
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
        placeholder="Search"
        className={styles.searchBar}
        sx={{ padding: "10px 14px" }}
        disabled={onlyWatched}
      />
      <div style={{ marginLeft: "10px" }}>
        Show only watched
        <Switch
          onClick={() => {
            setOnlyWatched(!onlyWatched);
            setSearchText("");
          }}
        />
      </div>
      <ul className={styles.list}>
        {isLoading
          ? "..."
          : filteredCurrencies.map((item: any, i: any) => {
              return (
                <li
                  className={styles.item}
                  key={i}
                  onClick={() => setActiveCurrency!(item.symbol)}
                  style={item.checked && { color: "#90caf9" }}
                >
                  <span>{item.symbol}</span>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default Sidebar;
