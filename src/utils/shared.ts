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
      return currenciesData
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