import prisma from "@/lib/clients/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  baseUrlFutures,
  destructureBinanceRes,
  fetchAltcoinPrices,
  sendTelegramNotification,
} from "@/utils/shared";
import type { AltcoinPrices } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AltcoinPrices | string>
) {
  const altcoins = await prisma.currency.findMany();
  const prices = await fetchAltcoinPrices(altcoins, "5m");

  for (let i = 0; i < altcoins.length; i++) {
    const targetAltcoin = altcoins[i].name;
    const targetPrice = altcoins[i].prices;
    const trendFlag = altcoins[i].trendFlag;
    const targetAltcoinMaxPrice = prices[targetAltcoin]?.max;
    const targetAltcoinMinPrice = prices[targetAltcoin]?.min;
    const targetAltcoinOpenPrice = prices[targetAltcoin]?.open;
    const targetAltcoinClosePrice = prices[targetAltcoin]?.close;
    for (let i = 0; i < targetPrice.length; i++) {
      if (
        Number(targetPrice[i]) >= targetAltcoinMinPrice &&
        Number(targetPrice[i]) <= targetAltcoinMaxPrice
      ) {
        await sendTelegramNotification(
          `${targetAltcoin} target price ${targetPrice[i]} reached.`
        );
        setTimeout(() => {
          checkIfTrendChange(
            targetAltcoin,
            targetAltcoinOpenPrice,
            targetAltcoinClosePrice
          );
        }, 180000);
        continue;
      }
    }
    if (trendFlag) {
      setTimeout(() => {
        checkIfTrendChange(
          targetAltcoin,
          targetAltcoinOpenPrice,
          targetAltcoinClosePrice
        );
      }, 180000);
    }
    continue;
  }

  res.status(200).json(prices);
}

const checkIfTrendChange = async (
  name: string,
  openLast: number,
  closeLast: number
) => {
  const interval = "5m";
  const limit = 1;
  const response = await fetch(
    `${baseUrlFutures}/fapi/v1/klines?symbol=${name}&interval=${interval}&limit=${limit}`
  );
  const data: any[][] = await response.json();
  const { open, close } = destructureBinanceRes(data);
  if (closeLast > openLast) {
    // значит был тренд на повышение, нужна красная свеча
    if (open > close) sendTelegramNotification(`${name}'s changing trand`);
  } else {
    // значит был тренд на понижение, нужна зеленая свеча
    if (close > open) sendTelegramNotification(`${name}'s changing trand`);
  }
};
