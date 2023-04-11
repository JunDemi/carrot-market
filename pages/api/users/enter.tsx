import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !== "POST"){
        res.status(401).end();
    }
  console.log(req.body);
  res.status(200).end();
}