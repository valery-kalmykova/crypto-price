import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrencies } from '@/utils/shared';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const currencies = await getCurrencies();
    res.status(200).json(currencies);
  };