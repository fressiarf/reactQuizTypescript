import React, { useState, useEffect } from 'react';
import ServiceCasosExito from '../services/ServiceCasosExito';
import '../style/casosExito.css';

function CasosExito() {

  const [casos, setCasos] = useState([]);

  const cargarCasos = async () => {
    const dataCasos = await ServiceCasosExito.getCasosExito();
    if (dataCasos) {
      setCasos(dataCasos);
    }
  };

  useEffect(() => {
    cargarCasos();
  }, []);


  const listadoCasos = casos.length > 0 ? (
    casos.map(caso => (
      <div key={caso.id} className="caso-card">
        <div className="caso-image-wrapper">
          <img 
            src={caso.foto || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500"} 
            alt={caso.nombre} 
            className="caso-img" 
          />
        </div>
        <div className="caso-body">
          <span className="badge-exito">{caso.etiqueta}</span>
          <h3>{caso.nombre}</h3>
          <p>{caso.historia}</p>
        </div>
      </div>
    ))
  ) : (
    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>
      Cargando maravillosas historias...
    </p>
  );


  return (
    <section className="casos-exito-section">
      <h2 className="casos-title">Historias que nos inspiran</h2>
      <div className="casos-grid">
        {listadoCasos}
      </div>
    </section>
  );
}

export default CasosExito;
