import { query } from "@/lib/config";
export const dynamic = "force-static";
import { OkPacket } from "mysql2";

export async function GET() {
  try {
    const recipes = await query({
      query:
        "SELECT Recipe.*, User.name AS user_name FROM Recipe JOIN User ON Recipe.userId = User.id",
      values: [],
    });
    return Response.json({ recipes });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al ejecutar la consulta";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, userId } = await request.json();

    console.log(title, description, userId);
    const result = await query({
      query: "INSERT INTO Recipe (title, description, userId) VALUES (?, ?, ?)",
      values: [title, description, userId],
    });
    return Response.json({
      message: "Receta creada exitosamente",
      title,
      description,
      userId,
      Id: (result as OkPacket).insertId,
    });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al ejecutar la consulta";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
