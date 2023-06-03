import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Chip from "@mui/material/Chip";
import Form from "../Form/Form";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useCurrencyContext } from "@/context/currencies";
import { getCurrencyList, sortArray } from "@/utils/shared";

const Main = () => {
  const value = useCurrencyContext();
  const { activeCurrency, setAllCurrencies } = value;
  const [activeCurrencyPrices, setActiveCurrencyPrices] = useState<string[]>(
    []
  );
  const [waitTrandChange, setWaitTrandChange] = useState<Boolean>(false);

  useEffect(() => {
    if (activeCurrency !== "") {
      fetch(`/api/watched-currencies/${activeCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          const {prices, trendFlag} = data;
          if (prices) {
            setActiveCurrencyPrices(prices);
          } else {
            setActiveCurrencyPrices([]);
          }
          if (trendFlag) {
            setWaitTrandChange(trendFlag);
          } else {
            setWaitTrandChange(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setActiveCurrencyPrices([]);
        });
    }
  }, [activeCurrency]);

  const updateAllCurrencies = async () => {
    const cussenciesData = await getCurrencyList();
    const sortedData = sortArray(cussenciesData);
    setAllCurrencies(sortedData);
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
    const formatPrice = price.replace(",", ".");
    const newData = { name: activeCurrency!, price: formatPrice };
    if (activeCurrencyPrices.length === 0) {
      await fetchWatchedCurrencies("POST", newData);
      await updateAllCurrencies();
    } else {
      await fetchWatchedCurrencies("PATCH", newData);
    }
    setActiveCurrencyPrices([...activeCurrencyPrices, formatPrice]);
  };

  const handleDelete = async (price: string) => {
    const name = activeCurrency!;
    if (activeCurrencyPrices.length === 1) {
      await fetch(`/api/watched-currencies/${activeCurrency}`, {
        method: "DELETE",
      });
      await updateAllCurrencies();
      setActiveCurrencyPrices([]);
      setWaitTrandChange(false);
    } else {
      await fetchWatchedCurrencies("PATCH", { name, price });
      setActiveCurrencyPrices(
        activeCurrencyPrices.filter((priceI) => priceI !== price)
      );
    }
  };

  const handleWaitTrendChange = async () => {
    const newData = { name: activeCurrency!, trendFlag: !waitTrandChange };
    setWaitTrandChange(!waitTrandChange);
    await fetchWatchedCurrencies("PATCH", newData);
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
      <Badge
        badgeContent={
          waitTrandChange ? (
            <DoneIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )
        }
        color="success"
      >
        <button
          disabled={activeCurrencyPrices.length === 0}
          className={styles.button}
          type="button"
          onClick={handleWaitTrendChange}
        >
          Wait for trend change
        </button>
      </Badge>
    </div>
  );
};

export default Main;
