'use client';
import Navbar from '@/app/components/navbar';
import { useEffect, useState } from 'react';

export default function DatesPage() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    //useEffect
    //
    const fetchDates = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dates`,
                {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }}
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Error al obtener citas');
                return;
            }
            setDates(data.data);
        } catch (error) {
            setError('Error de conexión.');
        }finally{
            setLoading(false);
        }
    ;}
    useEffect(() =>{
        fetchDates();
    },[]);
    if(loading) return <p>Cargando citas...</p>;
    const changeStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dates/${id}/state`,
                {
                    method:'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({estado: newStatus})
                }
            );
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Error al actualizar estado de la cita');
            }
            fetchDates(); //volvemos a actualizar la lista
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    };
    return(
        <div>
            <Navbar />
            <div className='p-8' >
                <h1 className='text-2xl font-bold mb-4'>Gestión de citas</h1>
                    {loading ? (
                        <p>Cargando citas...</p>
                    ) : dates.length > 0 ?(
                        <table className="w-full border">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Mascota</th>
                                    <th>Propietario</th>
                                    <th>Motivo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dates.map((date)=> (
                                    <tr key={date.id} className="text-center border-t">
                                        <td>{date.fecha.split('T')[0]}</td>
                                        <td>{date.hora}</td>
                                        <td>{date.mascota || date.mascota_id}</td>
                                        <td>{date.propietario || date.propietario_id}</td>
                                        <td>{date.motivo}</td>
                                        <td className="border p-2 text-center" >
                                            <span className="px-2 py-1 border rounded text-sm font-medium">
                                                {date.estado}
                                            </span>
                                        </td>
                                        <td className="p-2 border flex justify-center gap-2">
                                            {date.estado === 'pendiente' && (
                                                <>
                                                    <button
                                                        onClick={ () => 
                                                            changeStatus(date.id, 'confirmada')
                                                        }
                                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        onClick={ () => 
                                                            changeStatus(date.id, 'cancelada')
                                                        }
                                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay citas registradas</p>
                    )}
            </div>
        </div>        
    );
}