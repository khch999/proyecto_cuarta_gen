export default function MedicalModal({pet, onClose}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Ficha Médica</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="flex-1">
                        <p><strong>Nombre Mascota:</strong>{pet.nombre}</p>
                        <p><strong>Especie:</strong>{pet.especie}</p>
                        <p><strong>Raza:</strong>{pet.raza}</p>
                        <p><strong>Edad:</strong>{pet.edad}</p>
                    </div>
                    <div className="flex-1">
                        <p><strong>Nombre Propietario:</strong> {pet.nombre_propietario}</p>
                        <p><strong>Email:</strong> {pet.email}</p>
                        <p><strong>Teléfono:</strong> {pet.telefono}</p>
                    </div>
                    <div className="mb-4">
                        <p><strong>Historial Médico:</strong>{pet.historial_medico}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}