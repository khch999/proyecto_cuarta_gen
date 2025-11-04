'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{                                                           //authRoutes  router.post(/login)
            const res = await fetch("http://localhost:4000/api/v1/auth/login",{
                method: 'POST',
                headers: {"Content-Type":"application/json"}, //Accept:'application/json'
                body: JSON.stringify({email,password}),
            });
        
        const data = await res.json();

        if(!res.ok){   //mostramos el mensaje de error del ob data, si no hay mostramos mensaje "Error ..."
            setError(data.message || 'Error al iniciar seción.');
            return;
        }
        //guardo el token con localStorage.setItem(key,value)  {data:{token}}
        localStorage.setItem('token', data.data.token);// data.data.token
        //
        router.push('/dashboard/profile');
        }catch(err){
            setError('Error de conexión con el server.');
            console.error(err);
        }
    };

    return (    
  <div className="flex flex-col items-center justify-center h-screen gap-3 bg-gray-50">
    
    <img
      src="https://img.freepik.com/iconos-gratis/candado_318-790509.jpg"
      alt="Candado"
      className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md mb-2"
    />

    <h2 className="text-2xl font-bold">Login</h2>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-72 border border-gray-300 p-6 rounded-xl shadow-lg bg-white"
    >
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
      >
        Iniciar sesión
      </button>

      <p className="text-sm text-gray-600 mt-3">
        ¿No estás registrado?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Regístrate aquí
        </a>
      </p>

    </form>

    {error && <p className="text-red-500">{error}</p>}
  </div>
);


    
}