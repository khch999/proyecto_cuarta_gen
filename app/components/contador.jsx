"use client";
import { useState } from "react";

 export default function Contador() {
   const [count, setCount] = useState(0);

   return (
     <div className="bg-white p-6 rounded-lg shadow-lg text-center">
       <h2 className="text-2xl font-bold mb-4">Contador</h2>
       <p className="text-gray-700 mb-4 text-xl">{count}</p>
       <div className="flex justify-center gap-4">
         <button
           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
           onClick={() => setCount(count + 1)}
         >
           +
         </button>
         <button
           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
           onClick={() => setCount(count - 1)}
         >
           -
         </button>
         <button
           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
           onClick={() => setCount(0)}
         >
           Reset
         </button>
       </div>
     </div>
   );
 }

export default function TarjetaDatosUsuario({nombre,apellido,edad}){
  return(
    <div className="flex flex-col items-center ">      
      <p> {nombre} </p>
      <p> {apellido} </p>
      <p> {edad} </p>
    </div>
  )
}
