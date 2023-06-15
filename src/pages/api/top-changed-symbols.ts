import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchAltcoinPrices,
  sendTelegramNotification,
  getCurrencies,
} from "@/utils/shared";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const ratingArray = await get4hBarsRating();
  const topChanhed = ratingArray
    .sort((a: any, b: any) => (a.changed < b.changed ? 1 : -1))
    .slice(0, 10)
    .map((i) => `${i.name} - ${((i.changed)*100).toFixed(1)}`)
    .join(", ");
  const message = `Top changed: ${topChanhed}`;
  sendTelegramNotification(message);

  res.status(200).json(ratingArray);
}

const get4hBarsRating = async () => {
  const currenciesList = await getCurrencies();
  const currenciesWithPrices = await fetchAltcoinPrices(currenciesList, "4h");
  const currenciesWithChanges = [];
  for (let i = 0; i < currenciesList.length; i++) {
    const symbol = currenciesList[i].symbol;
    const max = currenciesWithPrices[symbol].max;
    const min = currenciesWithPrices[symbol].min;
    const changePercentage = (Number(max) - Number(min)) / Number(min);
    currenciesWithChanges.push({ name: symbol, changed: changePercentage });
  }
  return currenciesWithChanges;
};
