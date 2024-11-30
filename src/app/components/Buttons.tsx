"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Buttons({
  typeButton,
  id,
}: {
  typeButton: "users" | "recipes";
  id: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const message = typeButton === "users" ? "este usuario" : "esta receta";

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar ${message}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/${typeButton}/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        alert("Eliminado correctamente");
        location.reload();
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar");
    }
  };

  const handleEditFetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${typeButton}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEditData(data[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      alert("Error al cargar los datos para edición");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/${typeButton}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.status === 200) {
        alert("Actualizado correctamente");
        setIsModalOpen(false);
        location.reload();
      } else {
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-2 flex-col">
      {/* Delete Button */}
      <button
        className="p-2 rounded-lg hover:bg-red-900 grid"
        onClick={handleDelete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M294.73-148.08q-28.26 0-48.26-20-20.01-20.01-20.01-48.27v-501.23h-39.19v-55.89h174.35v-33.84h237.57v33.77h174.35v55.96h-39.2v501.32q0 28.35-19.91 48.27-19.92 19.91-48.35 19.91H294.73Zm383.65-569.5H282.42v501.23q0 5.39 3.46 8.85 3.47 3.46 8.85 3.46h371.35q4.61 0 8.46-3.84 3.84-3.85 3.84-8.47v-501.23ZM380.19-282.92h55.96v-355.96h-55.96v355.96Zm144.46 0h55.96v-355.96h-55.96v355.96ZM282.42-717.58V-204.04v-513.54Z" />
        </svg>
      </button>

      {/* Edit Button */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button
            className="p-2 rounded-lg hover:bg-blue-900"
            onClick={handleEditFetch}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M204.04-204.04h47.23L661.54-614 614-661.54 204.04-250.96v46.92Zm-55.96 55.96v-126.5L669.23-796q8.25-7.61 18.22-11.77 9.97-4.15 21.24-4.15 11.2 0 21.7 4.11 10.49 4.12 19.19 12.43L796-748.65q8.31 8.19 12.11 18.54 3.81 10.35 3.81 21.03 0 11.39-3.86 21.58-3.85 10.19-12.1 18.42l-521.38 521h-126.5Zm608.27-560.96-47.31-47.31 47.31 47.31Zm-118.87 71.56L614-661.54 661.54-614l-24.06-23.48Z" />
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-lime-950 border-none">
          <DialogHeader>
            <DialogTitle className="text-lime-100">
              {typeButton === "users" ? "Editar Usuario" : "Editar Receta"}
            </DialogTitle>
          </DialogHeader>
          {editData && (
            <form onSubmit={handleSaveEdit} className="grid gap-4 py-4">
              {/* Dynamic form fields based on type */}
              {Object.keys(editData).map(
                (key) =>
                  key !== "id" && (
                    <div
                      key={key}
                      className="grid grid-cols-4 items-center gap-4"
                    >
                      <Label htmlFor={key} className="text-right text-lime-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        id={key}
                        name={key}
                        value={editData[key] || ""}
                        onChange={handleInputChange}
                        className="col-span-3 bg-lime-800 text-lime-100 border-none"
                      />
                    </div>
                  )
              )}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="hover:opacity-80"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-lime-900"
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
