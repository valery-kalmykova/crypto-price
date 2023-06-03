import prisma from "@/lib/clients/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { baseUrlFutures, destructureBinanceRes } from "@/utils/shared";

interface AltcoinPrices {
  [key: string]: {
    max: number;
    min: number;
    open: number;
    close: number;
  };
}

interface Ialtcoins {
  name: string;
  prices: string[];
  trendFlag: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AltcoinPrices | string>
) {
  const altcoins = await prisma.currency.findMany();

  const prices = await fetchAltcoinPrices(altcoins);

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
        await sendTelegramNotification(targetAltcoin, targetPrice[i]);
        continue;
      }
    }
    if (trendFlag)
    setTimeout(() => {
      checkIfTrendChange(
        targetAltcoin,
        targetAltcoinOpenPrice,
        targetAltcoinClosePrice
      );
    }, 180000);
    continue;
  }

  res.status(200).json(prices);
}

async function fetchAltcoinPrices(
  altcoins: Ialtcoins[]
): Promise<AltcoinPrices> {
  const altcoinPrices: AltcoinPrices = {};

  const serverTime = await fetch(`${baseUrlFutures}/fapi/v1/time`);
  const serverTimeData = await serverTime.json();

  for (let i = 0; i < altcoins.length; i++) {
    const altcoin = altcoins[i].name;
    const interval = "5m";
    const limit = 1;
    const startTime =
      new Date(serverTimeData.serverTime).setSeconds(0, 0) - 5 * 60 * 1000;
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
}

async function sendTelegramNotification(
  altcoin: string,
  targetPrice?: string
): Promise<void> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  let message = "";
  if (targetPrice) {
    message = `${altcoin} target price ${targetPrice} reached.`;
  } else {
    message = `${altcoin}'s changing trand`;
  }
  await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`
  );
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
    if (open > close) sendTelegramNotification(name);
  } else {
    // значит был тренд на понижение, нужна зеленая свеча
    if (close > open) sendTelegramNotification(name);
  }
};
