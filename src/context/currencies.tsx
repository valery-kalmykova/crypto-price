import React, {
  SetStateAction,
  Dispatch,
  ReactNode,
  useContext,
  useState,
  createContext,
} from "react";

type ContainerProps = {
  children: ReactNode;
};

type CurrencyContextType = {
  activeCurrency: string;
  allCurrencies: any[];
  setActiveCurrency: Dispatch<SetStateAction<string>>;
  setAllCurrencies: Dispatch<SetStateAction<[]>>;
};

const defaultValue = {
  activeCurrency: "",
  allCurrencies: [],
  setActiveCurrency: ()=>{},
  setAllCurrencies: ()=>{},
}

export const CurrencyContext = createContext<CurrencyContextType>(defaultValue);

export const CurrencyProvider = (props: ContainerProps) => {
  const [activeCurrency, setActiveCurrency] = useState<string>("BTCUSDT");
  const [allCurrencies, setAllCurrencies] = useState<[]>([]);

  return (
    <CurrencyContext.Provider
      value={{
        activeCurrency,
        allCurrencies,
        setActiveCurrency,
        setAllCurrencies,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}
