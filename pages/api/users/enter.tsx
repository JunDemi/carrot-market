import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio"
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
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
  /*
  if(phone){
    await twilioClient.messages.create({
        messagingServiceSid: process.env.TWILIO_MSID,
        to: process.env.MY_PHONE!,
        from: "+15074167428",
        body: `Your login token is ${payload}`
      });
  }else if(email){
    const email = await mail.send({
      from: "qkrwjddnr99@naver.com",
      to: "qkrwjddnr99@naver.com",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`
    });
  }
  */
  return res.json({
    ok: true
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false
});
