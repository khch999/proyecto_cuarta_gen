"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar(){    
    const pathname = usePathname();
    const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const links =[
    { href: "/dashboard/profile", label: "Perfil" },
    { href: "/dashboard/users", label: "Usuarios" },
    { href: "/dashboard/pets", label: "Mascotas" },
    { href: "/dashboard/dates", label: "Citas" },
  ];
  return(
   <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
    <nav className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-gray-800 mr-6">🐾 </h1>
            {links.map((link)=>(
                    <Link
                    key={link.href}
                    href={link.href}
                    className={`text-gray-700 hover:text-blue-600 transition ${
                    pathname === link.href ? "font-semibold text-blue-600" : ""
                    }`}
                    >
                    {link.label}
                    </Link>
            ))}
    </nav>
    <div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm">Sesión activa</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>
   </header>
  );
}