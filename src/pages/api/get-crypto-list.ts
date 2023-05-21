import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const currencies = await getCurrencies();
    res.status(200).json(currencies);
  };

async function getCurrencies() {
    const response = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo');
    const data = await response.json();
    return data.symbols;
}