import React, { useEffect, useState } from 'react'
import ServiceSolicitud from '../services/ServiceSolicitud'
import "../style/paginaAdmin.css" // Reusing admin grid styles for user requests

function MisSolicitudes({ usuarioId }) {
  const [solicitudes, setSolicitudes] = useState([])

  async function cargarMisSolicitudes() {
    const data = await ServiceSolicitud.getSolicitudes()
    if (data) {
      const misSolicitudes = data.filter(solicitud => solicitud.usuarioId === usuarioId)
      setSolicitudes(misSolicitudes)
    } else {
      setSolicitudes([])
    }
  }

  useEffect(() => {
    if (usuarioId) {
      cargarMisSolicitudes()
    }
  }, [usuarioId])

  const getColorEstado = (estado) => {
    switch(estado) {
      case 'Pendiente': return '#f39c12'
      case 'Aprobada': return '#2cc761'
      case 'Rechazada': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  return (
    <div className="users-container" style={{maxWidth: '1000px', margin: '0 auto'}}>
      <h2 className="admin-title">Mis Solicitudes de Adopción</h2>
      <div className="user-grid">
        {solicitudes && solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <div key={solicitud.id} className="user-card" style={{borderTop: `4px solid ${getColorEstado(solicitud.estado)}`}}>
              <div className="user-header">
                <div className="user-info">
                  <h3>{solicitud.mascotaSolicitada || 'Sin Especificar'}</h3>
                  <span>Enviada: {solicitud.fecha}</span>
                </div>
              </div>
              <div className="user-body">
                <p><strong>Estado: </strong>
                  <span style={{
                    color: 'white', 
                    backgroundColor: getColorEstado(solicitud.estado),
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}>
                    {solicitud.estado}
                  </span>
                </p>
                <br />
                <p><strong>Mensaje enviado:</strong></p>
                <p style={{fontStyle: 'italic', fontSize: '0.9rem', color: '#555'}}>{solicitud.mensaje}</p>

                {solicitud.estado === 'Aprobada' && (
                  <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#e8f8f5', borderRadius: '5px', color: '#117a65', fontSize: '0.9rem'}}>
                    <strong>¡Felicidades!</strong> Tu adopción fue aprobada. Un agente se comunicará contigo mediante correo o teléfono próximamente.
                  </div>
                )}
                {solicitud.estado === 'Rechazada' && (
                  <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#fdedec', borderRadius: '5px', color: '#c0392b', fontSize: '0.9rem'}}>
                    Lo sentimos, tu solicitud no pudo ser aprobada en esta ocasión.
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-users">No has enviado ninguna solicitud de adopción, ¡Anímate a adoptar!</p>
        )}
      </div>
    </div>
  );
}

export default MisSolicitudes
