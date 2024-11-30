import { query } from "@/lib/config";
export const dynamic = "force-static";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const users = await query({
      query: "SELECT * From User WHERE id = ? LIMIT 1",
      values: [params.id],
    });
    if (users.affectedRows === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return Response.json(users);
  } catch {
    return Response.json({ error: "Error al buscar usuario" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userDelete = await query({
      query: "DELETE FROM User WHERE id = ?",
      values: [params.id],
    });

    if (userDelete.affectedRows === 0) {
      return Response.json({ error: "Usuario no encontrada" }, { status: 404 });
    }
    return Response.json({
      message: "Borrando usuario",
      userDelete,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const columns = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), params.id];

    const resultPut = await query({
      query: `UPDATE User SET ${columns} WHERE id = ?`,
      values: values,
    });

    if (resultPut.affectedRows === 0) {
      return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
    }
    return Response.json({
      message: "Actualizacion exitosa",
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
