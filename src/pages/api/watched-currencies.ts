import prisma from "@/lib/clients/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const result = await prisma.currency.findMany();
    res.status(200).json(result);
  } else if (req.method === "POST") {
    const { name, price } = req.body;
    const result = await prisma.currency.create({
      data: {
        name: name,
        prices: [price],
      },
    });
    res.status(200).json(result);
  } else if (req.method === "PATCH") {
    const { name, price } = req.body;
    const currency = await prisma.currency.findUnique({
      where: { name: name },
    });
    let newprices = currency?.prices!;
    if (newprices.includes(price)) {
        newprices.splice(newprices.indexOf(price), 1);
    } else {
        newprices.push(price);
    }
    const result = await prisma.currency.update({
      where: {
        name: String(name),
      },
      data: {
        prices: {
          set: newprices,
        },
      },
    });
    res.status(200).json(result);
  } else {
    res.status(405).send({ message: "Request not allowed" });
    return;
  }
}
