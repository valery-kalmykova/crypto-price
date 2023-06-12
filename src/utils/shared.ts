import type { AltcoinPrices, Ialtcoins } from "./types";

export const getCurrencyList = async () => {
  try {
    const currenciesReq = await fetch(`/api/get-crypto-list`);
    const currenciesData = await currenciesReq.json();
    const watchedCurrenciesReq = await fetch(`/api/watched-currencies`);
    const watchedCurrenciesData = await watchedCurrenciesReq.json();
    for (let i = 0; i < watchedCurrenciesData.length; i++) {
      currenciesData.map((item: { symbol: string; checked: boolean }) =>
        item.symbol === watchedCurrenciesData[i].name
          ? (item.checked = true)
          : null
      );
    }
    return currenciesData;
  } catch (err) {
    console.log(err);
  }
};

export const sortArray = (arr: any) => {
  return arr.sort((a: any, b: any) => (a.symbol > b.symbol ? 1 : -1));
};

export const baseUrlFutures = "https://fapi.binance.com";

export const destructureBinanceRes = (data: any) => {
  const [
    timestamp,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    quoteAssetVolume,
    numberOfTrades,
    takerBuyBaseAssetVolume,
    takerBuyQuoteAssetVolume,
    ignored,
  ] = data[0];
  return {
    timestamp,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    quoteAssetVolume,
    numberOfTrades,
    takerBuyBaseAssetVolume,
    takerBuyQuoteAssetVolume,
    ignored,
  };
};

export const getCurrencies = async () => {
  const response = await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo");
  const data = await response.json();
  return data.symbols;
};

export const fetchAltcoinPrices = async (
  altcoins: Ialtcoins[],
  intervalVal: string
): Promise<AltcoinPrices> => {
  const altcoinPrices: AltcoinPrices = {};

  const serverTime = await fetch(`${baseUrlFutures}/fapi/v1/time`);
  const serverTimeData = await serverTime.json();
  console.log(serverTimeData)
  const interval = intervalVal;
  const limit = 1000;
  let startTime;
  if (interval === "5m") {
    startTime =
      new Date(serverTimeData.serverTime).setSeconds(0, 0) - 5 * 60 * 1000;
  } else if (interval === "4h") {
    startTime =
      new Date(serverTimeData.serverTime).setSeconds(0, 0) - 4 * 60 * 60 * 1000;
  }

  for (let i = 0; i < altcoins.length; i++) {
    let altcoin = "";
    altcoins[i].name ? altcoin = altcoins[i].name : altcoin = altcoins[i].symbol!;
    const response = await fetch(
      `${baseUrlFutures}/fapi/v1/klines?symbol=${altcoin}&interval=${interval}&limit=${limit}&startTime=${startTime}`
    );
    const data: any[][] = await response.json();
    const { high, low, open, close } = destructureBinanceRes(data);
    altcoinPrices[altcoin] = {
      max: parseFloat(high),
      min: parseFloat(low),
      open: parseFloat(open),
      close: parseFloat(close),
    };
  }

  return altcoinPrices;
};

export const sendTelegramNotification = async (
  message: string
): Promise<void> => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`
  );
};

export const getCurrentPrice = async (symbol: string) => {
  const response = await fetch(`${baseUrlFutures}/fapi/v1/ticker/price?symbol=${symbol}`);
  const data: any = await response.json();
  const price = data.price;
  return price;
}