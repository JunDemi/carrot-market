import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req:NextApiRequest, res:NextApiResponse ){
    await client.user.create({
        data: {
            email: "xx",
            name: "xx"
        }
    });

    res.json({
        ok: true
    });
}