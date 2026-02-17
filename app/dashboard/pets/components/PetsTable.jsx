export default function PetsTable({
    pets,
    role,
    onEdit,
    onDelete,
    onView,
    onCreate
}){
    if (pets.length === 0) {
        return <p>No hay mascotas registradas</p>
    }
    return (
        <div className=" overflow-x-auto">
            {role === "admin" && (
                <button onClick={onCreate} 
                        className="mb-4 bg-green-600 text-white px-4 py-2 rounded "
                >
                    Crear Mascota
                </button>
            )}
            <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Especie</th>
                    <th className="p-2 border">Raza</th>
                    <th className="p-2 border">Edad</th>
                    <th className="p-2 border">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pets.map((pet) => (
                    <tr key={pet.id} className="text-center border-t">
                        <td className="p-2 border" >{pet.id}</td>
                        <td className="p-2 border" >{pet.nombre}</td>
                        <td className="p-2 border">{pet.especie}</td>
                        <td className="p-2 border">{pet.raza}</td>
                        <td className="p-2 border">{pet.edad}</td>
                        <td className="p-2 border space-x-2">

                    {role === "admin" && (
                        <>
                            <button
                                onClick={()=> (onEdit(pet))}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(pet.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </>
                    )}
                            <button
                                onClick={() => onView(pet.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Ficha Médica
                            </button>
                        </td>
                    </tr>                   
                ))}
            </tbody>
            </table>
        </div>
    );
}