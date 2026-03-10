import React, { useEffect, useState } from 'react'
import ServiceSolicitud from '../services/ServiceSolicitud'
import Swal from 'sweetalert2'
import "../style/paginaAdmin.css"

function GestionarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([])

  async function cargarSolicitudes() {
    const data = await ServiceSolicitud.getSolicitudes()
    if (data) {
      const pendientes = data.filter(solicitud => solicitud.estado === "Pendiente")
      setSolicitudes(pendientes)
    } else {
      setSolicitudes([])
    }
  }

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  async function eliminarSolicitud(id, nombre) {
    const resultado = await Swal.fire({
      title: '¿Rechazar solicitud?',
      text: `Estás a punto de eliminar la solicitud de ${nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#4e73df',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    })
    
    if (resultado.isConfirmed) {
      await ServiceSolicitud.patchSolicitud(id, { estado: 'Rechazada' })
      Swal.fire('¡Rechazada!', 'La solicitud ha sido rechazada.', 'success')
      cargarSolicitudes()
    }
  }

  async function aprobarSolicitud(id, nombre) {
    Swal.fire({
      title: '¡Solicitud Aprobada!',
      text: `Has aprobado la solicitud de ${nombre}. Recuerda contactarlo al correo o teléfono proporcionado.`,
      icon: 'success',
      confirmButtonColor: '#2cc761'
    })
    await ServiceSolicitud.patchSolicitud(id, { estado: 'Aprobada' })
    cargarSolicitudes()
  }

  return (
    <div className="users-container">
      <h2 className="admin-title">Panel de Solicitudes de Adopción</h2>
      <div className="user-grid">
        {solicitudes && solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <div key={solicitud.id} className="user-card">
              <div className="user-header">
                <div className="user-info">
                  <h3>{solicitud.nombreUsuario}</h3>
                  <span>Enviada: {solicitud.fecha}</span>
                </div>
              </div>
              <div className="user-body">
                <p><strong>Desea adoptar a:</strong> {solicitud.mascotaSolicitada || 'Sin especificar'}</p>
                <p><strong>Correo:</strong> {solicitud.correo}</p>
                <p><strong>Teléfono:</strong> {solicitud.telefono}</p>
                <br />
                <p><strong>Mensaje:</strong></p>
                <p style={{fontStyle: 'italic', fontSize: '0.9rem', color: '#555'}}>{solicitud.mensaje}</p>
              </div>
              <div className="user-actions" style={{display: 'flex', gap: '10px'}}>
                <button 
                  style={{flex: 1, backgroundColor: '#2cc761', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
                  onClick={() => aprobarSolicitud(solicitud.id, solicitud.nombreUsuario)}
                >
                  Aprobar
                </button>
                <button 
                  className="btn-delete-admin" 
                  style={{flex: 1}}
                  onClick={() => eliminarSolicitud(solicitud.id, solicitud.nombreUsuario)}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-users">No hay solicitudes pendientes en este momento.</p>
        )}
      </div>
    </div>
  );
}

export default GestionarSolicitudes
