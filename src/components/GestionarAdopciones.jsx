import React, { useEffect, useState } from 'react'
import ServiceAdopcion from '../services/ServiceAdopcion'
import Swal from 'sweetalert2'
import "../style/paginaAdmin.css"

function GestionarAdopciones() {
  const [adopciones, setAdopciones] = useState([])
  

 
  async function cargarAdopciones() {
    const dataAdopciones = await ServiceAdopcion.getAdopciones()
    setAdopciones(dataAdopciones)
  }

  useEffect(() => {
    cargarAdopciones()
  }, [])

 
  async function eliminarAdopcion(id, nombre) {
    const resultado = await
      Swal.fire({
        title: '¿Eliminar adopcion?',
        text: `Estás a punto de eliminar a ${nombre}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#4e73df',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })
    if (resultado.isConfirmed) {
      await ServiceAdopcion.deleteAdopciones(id)
      Swal.fire('¡Eliminado!', 'La adopcion ha sido borrada.', 'success')
      const dataAdopciones = await ServiceAdopcion.getAdopciones()
      setAdopciones(dataAdopciones) 
    }
  }

 
  const [gestionarAdopcion, setGestionarAdopcion] = useState(null)
  const [editandoAdopcion, setEditandoAdopcion] = useState("")
  const [drawerAbierto, setDrawerAbierto] = useState(false)

  async function abrirDrawer(adopcion) {
     console.log("Drawer abierto para:", adopcion)
    setGestionarAdopcion(adopcion)
    setEditandoAdopcion(adopcion)
    setDrawerAbierto(true)
    
  }

  async function realizarCambios() {
    if (gestionarAdopcion) {
      console.log("Informacion actualizada", editandoAdopcion)
      await ServiceAdopcion.patchAdopciones(editandoAdopcion, gestionarAdopcion.id)
      Swal.fire("Adopcion actualizada", "", "success")
      const dataAdopciones = await ServiceAdopcion.getAdopciones()
      setAdopciones(dataAdopciones || [])
      setDrawerAbierto(false)
    }
  }


  const [nuevoDrawerAbierto, setNuevoDrawerAbierto] = useState(false)
  const [nuevaAdopcion, setNuevaAdopcion] = useState({
    nombre: "",
    especie: "Perro",
    raza: "",
    edad: "",
    genero: "Macho",
    descripcion: "",
    foto: ""
  })

  async function crearAdopcion() {
    console.log("Nueva adopcion:", nuevaAdopcion)
    await ServiceAdopcion.postAdopciones(nuevaAdopcion)
    Swal.fire("Adopcion creada", "", "success")
    const dataAdopciones = await ServiceAdopcion.getAdopciones()
    setAdopciones(dataAdopciones || [])
    setNuevaAdopcion({ nombre: "", especie: "Perro", raza: "", edad: "", genero: "Macho", descripcion: "", foto: "" })
    setNuevoDrawerAbierto(false)
  }
  return (
    <div className="users-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="admin-title">Panel de Administración de Adopciones</h2>
        <button className="btn-edit-admin" style={{ padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }} onClick={() => setNuevoDrawerAbierto(true)}>
          + Nueva Adopción
        </button>
      </div>
      <div className="user-grid">
        {adopciones && adopciones.length > 0 ? (
          adopciones.map((adopcion) => (
            <div key={adopcion.id} className="user-card">
              <div className="user-header">
                <img src={adopcion.foto} alt={adopcion.nombre} className="user-avatar" />
                <div className="user-info">
                  <h3>{adopcion.nombre}</h3>
                  <span>{adopcion.especie}</span>
                </div>
              </div>
              <div className="user-body">
                <p><strong>Raza:</strong> {adopcion.raza}</p>
                <p><strong>Edad:</strong> {adopcion.edad}</p>
                <p><strong>Género:</strong> {adopcion.genero}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => abrirDrawer(adopcion)} className="btn-edit-admin">Editar</button>
                <button className="btn-delete-admin" onClick={() => eliminarAdopcion(adopcion.id, adopcion.nombre)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-users">No hay adopciones registradas.</p>
        )}
      </div>

    
      {drawerAbierto && (
        <div className="drawer-overlay">
          <div className="drawer-content" style={{ overflowY: 'auto' }}>
            <h3>Editar Adopción: {gestionarAdopcion?.nombre}</h3>
            
            <label>Nombre:</label>
            <input 
              type="text" 
              value={editandoAdopcion.nombre || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, nombre: e.target.value})} 
            />

            <label>Especie:</label>
            <select 
              value={editandoAdopcion.especie || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, especie: e.target.value})}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>

            <label>Raza:</label>
            <input 
              type="text" 
              value={editandoAdopcion.raza || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, raza: e.target.value})} 
            />

            <label>Edad:</label>
            <input 
              type="text" 
              value={editandoAdopcion.edad || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, edad: e.target.value})} 
            />

            <label>Género:</label>
            <select 
              value={editandoAdopcion.genero || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, genero: e.target.value})}
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>

            <label>Foto (URL):</label>
            <input 
              type="text" 
              value={editandoAdopcion.foto || ''} 
              onChange={(e) => setEditandoAdopcion({...editandoAdopcion, foto: e.target.value})} 
            />

            <div className="drawerBotonesUsuarios">
              <button onClick={realizarCambios}>Guardar cambios</button>
              <button onClick={() => setDrawerAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

    
      {nuevoDrawerAbierto && (
        <div className="drawer-overlay">
          <div className="drawer-content" style={{ overflowY: 'auto' }}>
            <h3>Nueva Adopción</h3>

            <label>Nombre:</label>
            <input 
              type="text" 
              value={nuevaAdopcion.nombre} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, nombre: e.target.value})} 
            />

            <label>Especie:</label>
            <select 
              value={nuevaAdopcion.especie} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, especie: e.target.value})}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>

            <label>Raza:</label>
            <input 
              type="text" 
              value={nuevaAdopcion.raza} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, raza: e.target.value})} 
            />

            <label>Edad:</label>
            <input 
              type="text" 
              value={nuevaAdopcion.edad} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, edad: e.target.value})} 
            />

            <label>Género:</label>
            <select 
              value={nuevaAdopcion.genero} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, genero: e.target.value})}
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>

            <label>Descripción:</label>
            <input 
              type="text" 
              value={nuevaAdopcion.descripcion} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, descripcion: e.target.value})} 
            />

            <label>Foto (URL):</label>
            <input 
              type="text" 
              value={nuevaAdopcion.foto} 
              onChange={(e) => setNuevaAdopcion({...nuevaAdopcion, foto: e.target.value})} 
            />

            <div className="drawerBotonesUsuarios">
              <button onClick={crearAdopcion}>Guardar</button>
              <button onClick={() => setNuevoDrawerAbierto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div >

  );
}


export default GestionarAdopciones