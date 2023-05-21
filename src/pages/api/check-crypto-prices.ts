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
      continue;
    }
  }
  
  res.status(200).json(prices);
}

async function fetchAltcoinPrices(
  altcoins: Ialtcoins[]
): Promise<AltcoinPrices> {
  const baseUrl = "https://api.binance.com/api/v3/klines";
  const altcoinPrices: AltcoinPrices = {};

  for (let i = 0; i < altcoins.length; i++) {
    const altcoin = altcoins[i].name;
    const interval = "5m";
    const limit = 1;
    const response = await fetch(
      `${baseUrl}?symbol=${altcoin}&interval=${interval}&limit=${limit}`
    );
    const data: any[][] = await response.json();
    const [timestamp, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume, ignored] = data[0];
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
  const message = `${altcoin} price is currently between ${minPrice} and ${maxPrice}, and the target price ${targetPrice} is within this range.`;

  await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`,
  );
}