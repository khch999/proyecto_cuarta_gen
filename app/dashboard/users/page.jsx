'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/navbar';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const url = search
        ? `http://localhost:4000/api/v1/users?search=${search}`
        : `http://localhost:4000/api/v1/users?page=${page}&limit=5`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
        setMeta(data.pagination || {});
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Quieres eliminar este usuario?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        alert('Usuario eliminado correctamente.');
        fetchUsers(meta.currentPage || 1);
      } else {
        alert(data.message || 'Error al eliminar usuario.');
      }
    } catch (error) {
      console.error('Error al tratar de eliminar usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedUser),
      });

      const data = await res.json();
      if (data.success) {
        alert('Usuario actualizado correctamente.');
        setShowModal(false);
        fetchUsers(meta.currentPage || 1);
      } else {
        alert(data.message || 'Error al actualizar usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className='text-3xl justify-center text-center font-bold mb-6'>Veterinaria San Luis</h1>
        <h2 className="text-2xl font-bold mb-4">Gestión de usuarios</h2>

        {/* Buscador */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar (Ingrese el nombre)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded p-2 w-64"
          />
          <button
            onClick={() => fetchUsers(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>

        {/* Tabla */}
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : users.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Teléfono</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-center border-t">
                  <td className="p-2 border">{u.id}</td>
                  <td className="p-2 border">{u.nombre}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.telefono}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay usuarios</p>
        )}

        {/* Paginación */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={!meta.hasPrevPage}
            onClick={() => fetchUsers(meta.currentPage - 1)}
            className={`px-4 py-2 rounded ${
              meta.hasPrevPage
                ? 'bg-gray-300 hover:bg-gray-400'
                : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            Anterior
          </button>
          <span>
            Página {meta.currentPage || 1} de {meta.totalPages || 1}
          </span>
          <button
            disabled={!meta.hasNextPage}
            onClick={() => fetchUsers(meta.currentPage + 1)}
            className={`px-4 py-2 rounded ${
              meta.hasNextPage
                ? 'bg-gray-300 hover:bg-gray-400'
                : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            Siguiente
          </button>
        </div>

        {/* Modal de edición */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Editar usuario</h2>
              <input
                type="text"
                value={selectedUser.nombre}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, nombre: e.target.value })
                }
                placeholder="Nombre"
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                placeholder="Email"
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                value={selectedUser.telefono}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, telefono: e.target.value })
                }
                placeholder="Teléfono"
                className="border rounded p-2 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
