import mysql from "mysql2/promise";
export const dynamic = "force-dynamic";

export async function query({
  query,
  values = [],
}: {
  query: string;
  values?: any[];
}) {
  // Establecer la conexión con la base de datos MySQL
  const dbconnection = await mysql.createConnection({
    host: "localhost", // Dirección del servidor de la base de datos
    database: "examen", // Nombre de la base de datos a la que se conecta
    user: "root", // Nombre de usuario para la conexión
    password: "1234", // Contraseña del usuario
    port: 3306, // Puerto donde se escucha la base de datos (por defecto MySQL)
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    console.log("Conexión exitosa a la base de datos...");

    dbconnection.end(); // Cerrar la conexión a la base de datos
    return results; // Retornar los resultados de la consulta
  } catch (error) {
    // Manejar errores durante la conexión o ejecución de la consulta
    console.error(
      "Error al conectar a la base de datos:",
      (error as any).message
    );
    //throw Error(error.message); // Descomentar para lanzar error en caso de fallo
    return { error }; // Retornar el error para su manejo en el llamador
  }
}
