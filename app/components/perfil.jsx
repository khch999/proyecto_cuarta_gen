'use client';
import { useState } from "react";

export default function Perfil({nombre}){
    const [seguimiento,setSeguimiento] = useState(false);
    
    return(
        <div className="border p-4 rounded text-center">
            <h3 className="font-semibold mb-2"> {nombre} </h3>
            <button onClick={ () => setSeguimiento(!seguimiento)}
                className={`px-4 py-2 rounded text-white ${seguimiento ? "bg-red-600" : "bg-green-600"}`}
                >
                {seguimiento ? "Dejar de seguir" : "Seguir"}
            </button>
        </div>
    );
}
