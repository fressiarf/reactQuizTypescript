import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceAdopcion from '../services/ServiceAdopcion';
import '../style/tarjetasAdopcion.css';

function TarjetasAdopcion() {

  const [adopciones, setAdopciones] = useState([]);
  const navigate = useNavigate();

  const cargarAdopciones = async () => {
    const dataAdopciones = await ServiceAdopcion.getAdopciones();
    setAdopciones(dataAdopciones);
  };

  useEffect(() => {
    cargarAdopciones();
  }, []);

  const handleAdoptar = (mascotaNombre) => {
    navigate('/formulario-adopcion', { state: { mascotaNombre } });
  };

  const listadoMascotas = adopciones.length > 0 ? (
    adopciones.map((adopcion) => (
      <div key={adopcion.id} className="adopcion-card">
        <div className="card-image-wrapper">
          <img
            src={adopcion.foto}
            alt={adopcion.nombre}
            className="adopcion-image"
          />
          <span className="specie-badge">{adopcion.especie}</span>
        </div>

        <div className="card-content">
          <h3>{adopcion.nombre}</h3>
          <div className="pet-details">
            <span className="detail-pill"><strong>Raza:</strong> {adopcion.raza}</span>
            <span className="detail-pill"><strong>Edad:</strong> {adopcion.edad}</span>
            <span className="detail-pill"><strong>Género:</strong> {adopcion.genero}</span>
          </div>
          <p className="pet-description">{adopcion.descripcion}</p>
        </div>

        <div className="card-footer">
          <button className="btn-adoptar" onClick={() => handleAdoptar(adopcion.nombre)}>
            Adoptar a {adopcion.nombre}
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="no-pets-message">No hay mascotas disponibles para adopción en este momento.</p>
  );

  return (
    <div className="adopcion-section">
      <h1 className="adopcion-title">Adopta un amigo</h1>
      <div className="tarjetas-container">
        {listadoMascotas}
      </div>
    </div>
  );
}

export default TarjetasAdopcion;