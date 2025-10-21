"use client";
import { useRouter } from "next/navigation";

export default function PaginaLobby(){
    const router = useRouter();

    return(
        <div className="h-screen flex flex-col items-center justify-center bg-gray-300">
            <h2 className="text-3xl font-bold mb-4">Bienvenido</h2>
            <button onClick={() => router.push("/")}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Cerrar Sesion
            </button>
        </div>
    )
}