'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/pets`);
      const data = await res.json();

      if (data.success) {
        setPets(data.data || []);
      } else {
        console.warn('Error al obtener mascotas:', data.message);
        setPets([]);
      }
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMedical = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/pets/${id}`);
      const data = await res.json();

      if (data.success) {
        setSelectedPet(data.data);
        setShowModal(true);
      } else {
        alert(data.message || 'Error al obtener ficha médica.');
      }
    } catch (error) {
      console.error('Error al obtener ficha médica:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className='text-3xl justify-center text-center font-bold mb-6'>Veterinaria San Luis</h1>
        <h2 className="text-2xl font-bold mb-6">Gestión de Mascotas</h2>

        {loading ? (
          <p>Cargando mascotas...</p>
        ) : pets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Especie</th>
                  <th className="p-2 border">Raza</th>
                  <th className="p-2 border">Edad</th>
                  <th className="p-2 border">Historial</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id} className="text-center border-t">
                    <td className="p-2 border">{pet.id}</td>
                    <td className="p-2 border">{pet.nombre}</td>
                    <td className="p-2 border">{pet.especie}</td>
                    <td className="p-2 border">{pet.raza}</td>
                    <td className="p-2 border">{pet.edad}</td>
                    <td className="p-2 border">{pet.historial_medico}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleViewMedical(pet.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Ver ficha médica
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay mascotas registradas</p>
        )}

        {/* Modal Ficha Médica */}
        {showModal && selectedPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Ficha Médica</h2>
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                {/* Datos Mascota */}
                <div className="flex-1">
                  <p><strong>Nombre Mascota:</strong> {selectedPet.nombre_mascota}</p>
                  <p><strong>Especie:</strong> {selectedPet.especie}</p>
                  <p><strong>Raza:</strong> {selectedPet.raza}</p>
                  <p><strong>Edad:</strong> {selectedPet.edad}</p>
                </div>
                {/* Datos Propietario */}
                <div className="flex-1">
                  <p><strong>Nombre Propietario:</strong> {selectedPet.nombre_propietario}</p>
                  <p><strong>Email:</strong> {selectedPet.email}</p>
                  <p><strong>Teléfono:</strong> {selectedPet.telefono}</p>
                </div>
              </div>
              {/* Historial Médico */}
              <div className="mb-4">
                <p><strong>Historial Médico:</strong> {selectedPet.historial_medico}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
