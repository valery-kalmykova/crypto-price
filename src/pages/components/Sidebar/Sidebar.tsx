import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";

function Sidebar() {
  const [searchText, setSearchText] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/crypto-list')
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data)
        setLoading(false)
      })
  }, [])

  const filteredCurrencies = currencies.filter((item: any) =>
    item.symbol.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Whatchlist</div>
      <InputText
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
        placeholder="Search..."
        className={styles.searchBar}
      />
      <ul className={styles.list}>
        {isLoading ? '...' : filteredCurrencies.map((item: any, i: any) => {
          return (
            <li
              className={styles.item}
              key={i}
            >
              {item.symbol}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
