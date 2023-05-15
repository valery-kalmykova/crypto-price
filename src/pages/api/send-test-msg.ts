import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const response = await sendTelegramNotification();
    res.status(200).json(response);
  };

async function sendTelegramNotification(): Promise<void> {
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const message = `Test`;

await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`,
);
}