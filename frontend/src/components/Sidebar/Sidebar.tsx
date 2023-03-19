import React, { useState } from "react";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";
// import { currencies } from "../../utils/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { setCurrency } from "../../services/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const currenciesq = useSelector((state) => state.common.currencies);
  const [searchText, setSearchText] = useState("");

  const filteredCurrencies = currenciesq.filter((item: any) =>
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
        {filteredCurrencies.map((item: any, i: any) => {
          return (
            <li
              className={styles.item}
              key={i}
              onClick={() => dispatch(setCurrency(item.symbol))}
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
