'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({nombre,email,telefono,password}),
            });
            const data = await res.json();

            if(!res.ok){   //mostramos el mensaje de error del ob data, si no hay mostramos mensaje "Error ..."
            setError(data.message || 'Error al registrar usuario.');
            return;
            }
            //token
            localStorage.setItem('token', data.data.token);
            router.push('/login');

        } catch (error) {
            setError('Error de conexión con el server.');
            console.error(err);
        }
    };
    return(        
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white px-4">
    
    <div className="mb-3">
      <img
        src="https://tse2.mm.bing.net/th/id/OIP.fdmY88cXhmIiDlqgL3r0sAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Perrito"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
      />
    </div>

    
    <h2 className="text-3xl font-bold text-blue-700 mb-4">Registro</h2>

    
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white shadow-lg border-2 border-blue-200 rounded-2xl p-6 w-full max-w-sm"
    >
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition"
      >
         REGISTRARME
      </button>
    </form>

    {error && <p className="text-red-500 mt-3">{error}</p>}
  </div>
);



        




    
}