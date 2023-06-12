import prisma from '@/lib/clients/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentPrice } from '@/utils/shared';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if (req.method === 'GET') {
      const query = req.query;
      const { activeCurrency } = query;
      const result = await prisma.currency.findUnique({
          where: {
              name: String(activeCurrency)
          }
      })
      if (!result) {
        res.status(200).json("Not found in db")
      } else {
        res.status(200).json(result);
      }
    } else if (req.method === 'DELETE') {
      const query = req.query;
      const { activeCurrency } = query;
      const result = await prisma.currency.delete({
          where: {
              name: String(activeCurrency)
          }
      })
      res.status(200).json(result);
    } else {
      res.status(405).send({ message: "Request not allowed" });
      return;
    }
  };
