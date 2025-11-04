'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay token, vamos al perfil
      router.push('/dashboard/profile');
    } else {
      // Si no hay token, vamos al login
      router.push('/login');
    }
  }, [router]);
  return(
    <p>Cargando...</p>
  )
   
}

