'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(usuario === "kevin" && clave === "password"){
            router.push("/lobby");
        }else{
            alert("Usuario y contraseña incorrectas, por favor inténtelo denuevo.");
            setUsuario("");
            setClave("");
        }
    };  
    // usuario === "kevin" && clave === "password" ? router.push("/lobby") : alert("Usuario y contraseña incorrectas.");
    return(
        <div className=" h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit}
            className=" bg-gray-300 p-6 rounded-2xl shadow-md w-90">
            <h2 className="text-xl font-bold mb-4 text-center">Inicio de Sesion</h2>
            <input type="text" placeholder="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}
            className="border w-full p-2 mb-3 rounded-md" />
            <input type="password" placeholder="clave" value={clave} onChange={(e) => setClave(e.target.value)}
            className="border  w-full p-2 mb-3 rounded-md" />
            <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-900" >Ingresar</button>
            </form>
        </div>
    )
}