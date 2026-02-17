export default function PetsFormModal({
    isEditing,
    formData,
    onChange,
    onSubmit,
    onClose
}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">
                    {isEditing ? "Editar Mascota" : "Crear Mascota"}
                </h2>
                <form onSubmit={onSubmit} className="space-y-3">
                    <input 
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input 
                        name="especie"
                        placeholder="Especie"
                        value={formData.especie}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input 
                        name="raza"
                        placeholder="Raza"
                        value={formData.raza}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="number" 
                        name="edad"
                        placeholder="Edad"
                        value={formData.edad}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <textarea 
                        name="historial_medico"
                        placeholder="Historial Médico"
                        value={formData.historial_medico}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                    /> 
                    <input 
                        name="propietario_id"
                        placeholder="ID Propietario"
                        value={formData.propietario_id}
                        onChange={onChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Guardar
                        </button>
                    </div>                   
                </form>
            </div>
        </div>
    )
}