import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const currencies = await getCurrencies();
    res.status(200).json(currencies);
  };

async function getCurrencies() {
    const response = await axios.get<any>('https://fapi.binance.com/fapi/v1/exchangeInfo');
    const data = response.data.symbols
    return data;
}