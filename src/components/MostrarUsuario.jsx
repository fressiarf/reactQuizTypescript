import React, { useEffect, useState } from 'react'
import ServiceUsuario from '../services/ServiceUsuario'
import Swal from 'sweetalert2'
import "../style/paginaAdmin.css"

function MostrarUsuario() {
  const [usuarios, setUsuarios] = useState([])
  

 
  async function cargarUsuarios() {
    const dataUsuarios = await ServiceUsuario.getUsuarios()
    setUsuarios(dataUsuarios)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])


  async function eliminarUsuario(id, nombre) {
    const resultado = await
      Swal.fire({
        title: '¿Eliminar usuario?',
        text: `Estás a punto de eliminar a ${nombre}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#4e73df',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })
    if (resultado.isConfirmed) {
      await ServiceUsuario.deleteUsuarios(id)
      Swal.fire('¡Eliminado!', 'El usuario ha sido borrado.', 'success')
      const dataUsuarios = await ServiceUsuario.getUsuarios()
      setUsuarios(dataUsuarios) 
    }
  }

  const [gestionarUsuario, setGestionar] = useState(null)
  const [editandoRol, setEditandoRol] = useState("")
  const [drawerAbierto, setDrawerAbierto] = useState(false)

  async function abrirDrawer(usuario) {
     console.log("Drawer abierto para:", usuario)
    setGestionar(usuario)
    setEditandoRol(usuario.rol)
    setDrawerAbierto(true)
    
  }

  async function realizarCambios() {
    const informacionActualaizada = {
      rol: editandoRol
    }
    if (gestionarUsuario) {
      console.log("Informacion actualizada", informacionActualaizada)
      await ServiceUsuario.patchUsuarios(informacionActualaizada, gestionarUsuario.id)
      Swal.fire("Rol actualizado", "", "success")
      const dataUsuarios = await ServiceUsuario.getUsuarios()
      setUsuarios(dataUsuarios || [])
      setDrawerAbierto(false)
    }
  }
  return (
    <div className="users-container">
      <h2 className="admin-title">Panel de Administración de Usuarios</h2>
      <div className="user-grid">
        {usuarios && usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <div key={usuario.id} className="user-card">
              <div className="user-header">
                <img src={usuario.fotoPerfil} alt={usuario.nombre} className="user-avatar" />
                <div className="user-info">
                  <h3>{usuario.nombre}</h3>
                  <span>{usuario.rol}</span>
                </div>
              </div>
              <div className="user-body">
                <p><strong>Email:</strong> {usuario.correo}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p className="user-password-hint"><strong>Clave:</strong> ••••••••</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => abrirDrawer(usuario)} className="btn-edit-admin">Editar</button>
                <button className="btn-delete-admin" onClick={() => eliminarUsuario(usuario.id, usuario.nombre)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-users">No hay usuarios registrados.</p>
        )}
      </div>
      {drawerAbierto && (
        <div className="drawer-overlay">
          <div className="drawer-content">
            <h3>Usuario: {gestionarUsuario?.nombre}</h3>
            <label htmlFor='editandoRol'>Rol:</label>
            <select value={editandoRol} onChange={(e) => setEditandoRol(e.target.value)} name="editarRol" id="editarRol">
              <option value="usuario">Usuario</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="drawerBotonesUsuarios">
              <button onClick={realizarCambios}>Guardar cambios</button>
              <button onClick={() => setDrawerAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div >

  );
}


export default MostrarUsuario