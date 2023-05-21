import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Chip from "@mui/material/Chip";
import Form from "../Form/Form";
import { useCurrencyContext } from "@/context/currencies";
import { getCurrencyList } from "@/utils/shared";

const Main = () => {
  const value = useCurrencyContext();
  const { activeCurrency, setAllCurrencies } = value;
  const [activeCurrencyPrices, setActiveCurrencyPrices] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (activeCurrency !== "") {
      fetch(`/api/watched-currencies/${activeCurrency}`)
        .then((res) => res.json())
        .then((data) => setActiveCurrencyPrices(data.prices))
        .catch((err) => {
          console.log(err);
          setActiveCurrencyPrices([]);
        });
    }
  }, [activeCurrency]);

  const updateAllCurrencies = async () => {
    const cussenciesData = await getCurrencyList();
    setAllCurrencies(cussenciesData);
  };

  const fetchWatchedCurrencies = async (
    method: string,
    newData: { name: string; price?: string }
  ) => {
    const response = await fetch(`/api/watched-currencies`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (price: string) => {
    const newData = { name: activeCurrency!, price: price };
    if (activeCurrencyPrices.length === 0) {
      await fetchWatchedCurrencies("POST", newData);
      await updateAllCurrencies();
    } else {
      await fetchWatchedCurrencies("PATCH", newData);
    }
    setActiveCurrencyPrices([...activeCurrencyPrices, price]);
  };

  const handleDelete = async (price: string) => {
    const name = activeCurrency!;
    if (activeCurrencyPrices.length === 1) {
      await fetch(`/api/watched-currencies/${activeCurrency}`, {
        method: "DELETE",
      });
      await updateAllCurrencies();
      setActiveCurrencyPrices([]);
    } else {
      await fetchWatchedCurrencies("PATCH", { name, price });
      setActiveCurrencyPrices(
        activeCurrencyPrices.filter((priceI) => priceI !== price)
      );
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} />
      {activeCurrencyPrices &&
        activeCurrencyPrices.map((price) => {
          return (
            <Chip
              key={price}
              label={price}
              variant="outlined"
              onDelete={() => handleDelete(price)}
            />
          );
        })}
    </div>
  );
};

export default Main;
