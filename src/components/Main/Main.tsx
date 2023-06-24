import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Chip from "@mui/material/Chip";
import Form from "../Form/Form";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useCurrencyContext } from "@/context/currencies";
import { getCurrencyList, getCurrentPrice, sortArray } from "@/utils/shared";
import { WaitButton } from "./WaitButton";

const Main = () => {
  const value = useCurrencyContext();
  const { activeCurrency, setAllCurrencies } = value;
  const [activeCurrencyPrices, setActiveCurrencyPrices] = useState<string[]>(
    []
  );
  const [waitTrandChange, setWaitTrandChange] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<string>("");

  useEffect(() => {
    if (activeCurrency !== "") {
      fetch(`/api/watched-currencies/${activeCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          const { prices, trendFlag } = data;
          if (prices) {
            prices.sort((a: string, b: string) =>
              Number(a) > Number(b) ? 1 : -1
            );
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
      (async () => {
        try {
          const data = await getCurrentPrice(activeCurrency);
          setCurrentPrice(data);
        } catch (err) {
          setCurrentPrice("");
          console.log(err);
        }
      })();
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
    setActiveCurrencyPrices(
      [...activeCurrencyPrices, formatPrice].sort((a: string, b: string) =>
        Number(a) > Number(b) ? 1 : -1
      )
    );
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
      <div className={styles.flexRow}>
        <Form onSubmit={handleSubmit} currentPrice={currentPrice} />
        <WaitButton
          waitTrandChange={waitTrandChange}
          activeCurrencyPrices={activeCurrencyPrices}
          handleWaitTrendChange={handleWaitTrendChange}
        />
      </div>
      {activeCurrencyPrices &&
        activeCurrencyPrices.map((price: string) => {
          return (
            <Chip
              sx={
                Number(price) >= Number(currentPrice)
                  ? { color: "#66bb6a", fontWeight: "500" }
                  : { color: "#d32f2f", fontWeight: "500" }
              }
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
