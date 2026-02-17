'use client';
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function ProfilePage(){
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
    const fetchProfile = async () => {
        //tomamos el token del local storage guardado
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

try {                                                            //authRoutes router.get('/profile', authenticateToken, AuthController.getProfile);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) { //si hay un fallo eliminamos el token 
          localStorage.removeItem('token');
          //devolvemos al login
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUser(data.data); // data.data porque el backend devuelve { success, message, data }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [router]);

  //nos deslogueamos
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
    try {                                           //authController.js router.post('/logout', authenticateToken, AuthController.logout);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error(err);
      }
    }
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow gap-3 mt-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>

      <div className="bg-white border rounded-2xl shadow-lg w-80 p-6 text-center">
        <div className="flex justify-center mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Avatar de usuario" 
          className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-md"/>
        </div>
      

      <div className="border rounded p-4 shadow-md w-64 text-center">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
      </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white rounded p-2 hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </main>
    </div>
  );
}


