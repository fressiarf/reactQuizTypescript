import React, { useState, useEffect } from 'react';
import ServicePerfil from '../services/ServicePerfil';
import Swal from 'sweetalert2';
import '../style/perfil.css';
import { useNavigate } from 'react-router-dom';

function FormPerfil() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    const usuarioSesion = localStorage.getItem('usuarioLogueado');
    if (usuarioSesion) {
      const tempUsuario = JSON.parse(usuarioSesion);
      setNombre(tempUsuario.nombre || '');
      setCorreo(tempUsuario.correo || '');
      setTelefono(tempUsuario.telefono || '');
      setFotoPerfil(tempUsuario.fotoPerfil || '');
      setContra('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPerfil(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const actualizarPerfil = async () => {
    if (!nombre || !correo || !telefono) {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos deben estar llenos',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const objActualizar = { nombre, correo, telefono, fotoPerfil };
    if (contra) objActualizar.contra = contra;

    const respuesta = await ServicePerfil.patchPerfil(objActualizar, usuarioSesion.id);

    if (respuesta) {
      const usuarioActualizado = { ...usuarioSesion, ...respuesta };
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));

      Swal.fire({
        title: '¡Éxito!',
        text: 'Perfil actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setEditando(false);
      obtenerDatos();
    }
  };

  const eliminarCuenta = async () => {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar cuenta',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      const usuarioSesion = JSON.parse(localStorage.getItem('usuarioLogueado'));
      const respuesta = await ServicePerfil.deletePerfil(usuarioSesion.id);

      if (respuesta) {
        localStorage.removeItem('usuarioLogueado');
        Swal.fire('Eliminado', 'Tu cuenta ha sido eliminada.', 'success').then(() => navigate('/'));
      }
    }
  };

  
  const headerSection = (
    <div className="perfil-header">
      <h2>Mi Perfil</h2>
      {!editando && (
        <div className="perfil-avatar-main">
          <img 
            src={fotoPerfil || "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-usuario_157943-15752.jpg"} 
            alt="Profile" 
            className="main-avatar-img"
          />
        </div>
      )}
    </div>
  );

  const editImageSection = editando && (
    <div className="image-upload-container">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        id="profile-foto-input" 
        style={{display: 'none'}} 
      />
      <label htmlFor="profile-foto-input" className="btn-upload-circle">
        <img 
          src={fotoPerfil || "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-usuario_157943-15752.jpg"} 
          alt="Preview" 
          className="preview-circular" 
        />
        <div className="overlay-upload"><span>Cambiar</span></div>
      </label>
    </div>
  );

  const fieldsSection = (
    <>
      <h4>Nombre completo</h4>
      {editando ? (
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      ) : (
        <p className="info-value">{nombre}</p>
      )}

      <h4>Correo electrónico</h4>
      {editando ? (
        <input type="email" value={correo} disabled />
      ) : (
        <p className="info-value">{correo}</p>
      )}

      <h4>Teléfono</h4>
      {editando ? (
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      ) : (
        <p className="info-value">{telefono || "No especificado"}</p>
      )}

      {editando && (
        <>
          <h4>Cambiar Contraseña (Opcional)</h4>
          <input
            type="password"
            value={contra}
            onChange={(e) => setContra(e.target.value)}
            placeholder="Nueva contraseña"
          />
        </>
      )}
    </>
  );

  const actionButtons = (
    <div className="actions">
      {editando ? (
        <>
          <button onClick={actualizarPerfil}>Guardar Cambios</button>
          <button className="btn-cancel" onClick={() => { obtenerDatos(); setEditando(false); }}>Cancelar</button>
        </>
      ) : (
        <>
          <button onClick={() => setEditando(true)}>Editar Perfil</button>
          <button onClick={eliminarCuenta}>Eliminar Cuenta</button>
        </>
      )}
    </div>
  );

 
  return (
    <div className="perfil-container">
      {headerSection}
      <div className="perfil-content">
        {editImageSection}
        {fieldsSection}
        {actionButtons}
      </div>
    </div>
  );
}

export default FormPerfil;