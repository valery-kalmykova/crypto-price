export interface AltcoinPrices {
  [key: string]: {
    max: number;
    min: number;
    open: number;
    close: number;
  };
}

export interface Ialtcoins {
  name: string;
  symbol?: string;
  prices: string[];
  trendFlag: boolean;
}
