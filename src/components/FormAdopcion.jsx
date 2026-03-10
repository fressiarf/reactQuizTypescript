import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ServiceSolicitud from '../services/ServiceSolicitud';
import '../style/formAdopcion.css';

function FormAdopcion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nombreMascota, setNombreMascota] = useState('');
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const sesion = localStorage.getItem('usuarioLogueado');
    if (sesion) {
      setUsuarioLogueado(JSON.parse(sesion));
    }
    if (location.state && location.state.mascotaNombre) {
      setNombreMascota(location.state.mascotaNombre);
    }
  }, [location]);

  if (!usuarioLogueado) {
    return (
      <div className="adopcion-wrapper">
        <div className="adopcion-container">
          <div className="adopcion-header">
            <h2>Formulario de Adopción</h2>
            <p style={{ textAlign: 'center', color: '#e74c3c', fontWeight: 'bold', marginTop: '20px' }}>
              Debes iniciar sesión para solicitar una adopción.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button className="btn-adopcion" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const enviarSolicitud = async (e) => {
    e.preventDefault();

    const nuevaSolicitud = {
      usuarioId: usuarioLogueado.id,
      nombreUsuario: nombre,
      correo: correo,
      telefono: telefono,
      mascotaSolicitada: nombreMascota,
      mensaje: mensaje,
      fecha: new Date().toLocaleDateString(),
      estado: "Pendiente"
    };

    const res = await ServiceSolicitud.postSolicitud(nuevaSolicitud);
    if (res) {
      Swal.fire({
        title: '¡Solicitud Enviada!',
        text: 'Nuestros agentes revisarán tu perfil y te contactarán pronto.',
        icon: 'success',
        confirmButtonColor: '#4e73df'
      }).then(() => {
        navigate('/home');
      });
    } else {
      Swal.fire('Error', 'No se pudo enviar la solicitud. Intenta nuevamente más tarde.', 'error');
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('-')) {
      return;
    }
    setTelefono(value);
  };

  return (
    <div className="adopcion-wrapper">
      <div className="adopcion-container">
        <div className="adopcion-header">
          <h2>Formulario de Adopción</h2>
          {nombreMascota && (
            <p className="subtitle-form" style={{textAlign: 'center', color: '#4e73df', fontWeight: 'bold'}}>
              Estás solicitando adoptar a: {nombreMascota}
            </p>
          )}
        </div>
        <form className="adopcion-content" onSubmit={enviarSolicitud}>
          <label htmlFor="nombre">Tu Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label htmlFor="correo">Correo Electrónico</label>
          <input type="email" id="correo" name="correo" placeholder="ejemplo@correo.com" required value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <label htmlFor="telefono">Teléfono</label>
          <input type="text" id="telefono" name="telefono" placeholder="Número de contacto" required value={telefono} onChange={handleTelefonoChange} />

          <label htmlFor="mascota-solicitada">Mascota seleccionada</label>
          <input 
            type="text" 
            id="mascota-solicitada" 
            value={nombreMascota} 
            readOnly 
            placeholder="No se ha seleccionado mascota"
            style={{backgroundColor: '#f8f9fc'}}
          />

          <label htmlFor="mensaje">¿Por qué quieres adoptar?</label>
          <textarea id="mensaje" name="mensaje" required placeholder="Cuéntanos un poco sobre ti y el hogar que ofreces" value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>

          <button type="submit" className="btn-adopcion">Enviar solicitud para {nombreMascota || 'adoptar'}</button>
        </form>
      </div>
    </div>
  );
}

export default FormAdopcion;