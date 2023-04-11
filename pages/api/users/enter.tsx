import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio"

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function Handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if(!user) return res.status(400).json({ok: false});
  const payload = Math.floor(100000 + Math.random() * 900000) + ""
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if(phone){
    await twilioClient.messages.create({
        messagingServiceSid: process.env.TWILIO_MSID,
        to: process.env.MY_PHONE!,
        from: "+15074167428",
        body: `Your login token is ${payload}`
      });
  }
  return res.json({
    ok: true
  });
}

export default withHandler("POST", Handler);
