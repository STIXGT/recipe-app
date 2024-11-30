"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserComponent() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = await fetch("/api/users/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (data.ok) {
      alert("Usuario creado exitosamente");
    }

    router.push("/users");
    router.refresh();
  };
  return (
    <div className=" py-5 w-1/2 mx-auto ">
      <h1 className="text-4xl text-center text-white">Registrar Usuarios</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
        className=" grid p-10 justify-center text-black gap-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          autoFocus
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
