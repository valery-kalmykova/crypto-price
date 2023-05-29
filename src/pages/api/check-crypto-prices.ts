import prisma from "@/lib/clients/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

interface AltcoinPrices {
  [key: string]: {
    max: number;
    min: number;
  };
}

interface Ialtcoins {
  name: string;
  prices: string[];
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
    const targetAltcoinMaxPrice = prices[targetAltcoin]?.max;
    const targetAltcoinMinPrice = prices[targetAltcoin]?.min;
    for (let i = 0; i < targetPrice.length; i++) {
      if (
        Number(targetPrice[i]) >= targetAltcoinMinPrice &&
        Number(targetPrice[i]) <= targetAltcoinMaxPrice
      ) {
        await sendTelegramNotification(
          targetAltcoin,
          targetAltcoinMaxPrice,
          targetAltcoinMinPrice,
          targetPrice[i]
        );
        continue;
      }
    }
    continue;
  }

  res.status(200).json(prices);
}

async function fetchAltcoinPrices(
  altcoins: Ialtcoins[]
): Promise<AltcoinPrices> {
  // const baseUrl = "https://api.binance.com/api/v3/klines";
  const baseUrlFutures = "https://fapi.binance.com";
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
    altcoinPrices[altcoin] = {
      max: parseFloat(high),
      min: parseFloat(low),
    };
  }

  return altcoinPrices;
}

async function sendTelegramNotification(
  altcoin: string,
  maxPrice: number,
  minPrice: number,
  targetPrice: string
): Promise<void> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  const message = `${altcoin} target price ${targetPrice} reached.`;

  await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`
  );
}
