import { query } from "@/lib/config";
export const dynamic = "force-static";
import { OkPacket } from "mysql2";

export async function GET() {
  try {
    const users = await query({
      query: "SELECT * FROM User",
      values: [],
    });
    return Response.json(users);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al ejecutar la consulta";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    const result = await query({
      query: "INSERT INTO User (name, email) VALUES (?, ?)",
      values: [name, email],
    });
    return Response.json({
      message: "Usuario creado exitosamente",
      name,
      email,
      Id: (result as OkPacket).insertId,
    });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al ejecutar la consulta";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
