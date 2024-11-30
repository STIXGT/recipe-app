"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function RecipeComponent() {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    userId: "",
  });

  const form = useRef(null);
  const handleChange = (e: any) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = await fetch("/api/recipes/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (data.ok) {
      alert("Receta creada exitosamente");
    }

    router.refresh();
    router.push("/recipes");
  };

  return (
    <div className=" py-5 w-1/2 mx-auto">
      <h1 className="text-4xl text-center text-white">Crea tu Receta</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/recipes"
        method="POST"
        className="grid p-5 justify-center text-black gap-5"
        ref={form}
      >
        <input
          type="text"
          name="userId"
          placeholder="Usuario"
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Titulo"
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripcion"
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          maxLength={255}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
