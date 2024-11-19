import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const res = await prisma.user.findMany();
  console.log("respuesta", res);
  return Response.json(res);
}
