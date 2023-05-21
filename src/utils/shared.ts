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
