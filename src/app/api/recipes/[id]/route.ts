import { query } from "@/lib/config";
export const dynamic = "force-static";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipes = await query({
      query: "SELECT * from Recipe WHERE id = ?",
      values: [params.id],
    });
    if (recipes.affectedRows === 0) {
      return Response.json({ error: "Receta no encontrada" }, { status: 404 });
    }

    return Response.json(recipes);
  } catch {
    return Response.json({ error: "Error al buscar receta" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipeDelete = await query({
      query: "DELETE FROM Recipe WHERE id = ?",
      values: [params.id],
    });

    if (recipeDelete.affectedRows === 0) {
      return Response.json({ error: "Receta no encontrada" }, { status: 404 });
    }
    return Response.json({
      message: "Borrando receta",
      recipeDelete,
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
      query: `UPDATE Recipe SET ${columns} WHERE id = ?`,
      values: values,
    });

    if (resultPut.affectedRows === 0) {
      return Response.json({ error: "Receta no encontrada" }, { status: 404 });
    }
    return Response.json({
      message: "Actualizacion exitosa",
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
