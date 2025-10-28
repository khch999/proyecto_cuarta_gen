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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email,password})
            });
        
        const data = await res.json();

        if(!res.ok){   //mostramos el mensaje de error del ob data, si no hay mostramos mensaje "Error ..."
            setError(data.message || 'Error al iniciar seción.');
            return;
        }
        //guardo el token con localStorage.setItem(key,value)  {data:{token}}
        localStorage.setItem('token',data.data.token);
        //
        router.push('/profile');
        }catch(err){
            setError('Error de conexión con el server.');
            console.error(err);
        }
    };
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    return (
       <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
    );
}