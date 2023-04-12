import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import { ResponseType } from "./enter";

async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: {id: req.session.user?.id}
  });
  res.json({
    ok: true,
    profile,
  });
}
export default withApiSession(withHandler("GET", Handler));
