'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import PetsTable from './components/PetsTable';
import PetsFormModal from './components/PetsFormModal';
import MedicalModal from './components/MedicalModal';
import Navbar from '@/app/components/navbar';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    historial_medico: "",
    propietario_id: ""
  });

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets`);
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
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/${id}`,{
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
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

  const handleCreate = () => {
    setIsEditing(false);
    setFormData({
      nombre: "",
      especie: "",
      raza: "",
      edad: "",
      historial_medico: "",
      propietario_id: ""
    });
    setShowFormModal(true);
  }

  const handleEdit = (pet) => {
    setIsEditing(true);
    setFormData({
      nombre: pet.nombre,
      especie: pet.especie,
      raza: pet.raza,
      edad: pet.edad,
      historial_medico: pet.historial_medico,
      propietario_id: pet.propietario_id
    });
    setSelectedPet(pet);
    setShowFormModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Queires eliminar esta mascota?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/${id}`,{
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchPets(); 
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
    }
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/${selectedPet.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets`;

      const method = isEditing ? "PUT" : "POST";
      console.log("Datos enviados:", formData);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowFormModal(false);
        fetchPets();
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error("Error guardando datos de mascota:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.rol);
    }
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
          <PetsTable
          pets= {pets}
          role={role}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleViewMedical}
          onCreate={handleCreate}
          />
        ) : (
          <p>No hay mascotas registradas</p>
        )}

        {showFormModal && (
          <PetsFormModal
            isEditing={isEditing}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => setShowFormModal(false)}
          />
)}
        {/* Modal Ficha Médica */}
        {showModal && selectedPet && (
          <MedicalModal
            pet={selectedPet}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}