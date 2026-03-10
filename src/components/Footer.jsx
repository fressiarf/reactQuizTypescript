import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import '../style/footer.css'
import logo2 from "../img/logo2.png"

function Footer() {
  return (
    <footer className="footer-container">
        <div className="footer-donaciones-horizontal">
          <h4 style={{ color: '#1fa3d1', textAlign: 'center', marginBottom: '15px', fontSize: '1.2rem' }}>
              Apoya con una Donación
          </h4>
          <div className="donaciones-row">
            <div className="donacion-card-inline">
              <strong> Banco Nacional</strong>
              <p>CR21 0152 0001 0026 8374 51<br/>Cédula: 3-006-748291</p>
            </div>
            <div className="donacion-card-inline">
              <strong> SINPE Móvil</strong>
              <p>8847-3621<br/>(Huellas Seguras)</p>
            </div>
            <div className="donacion-card-inline">
              <strong> PayPal</strong>
              <p>donaciones@huellasseguras.org<br/>&nbsp;</p>
            </div>
          </div>
        </div>

      <div className="footer-content">
          <div className="footer-logo">
            <img src={logo2} alt="Logo" />
            <p>Red Huellas Seguras</p>
          </div>
          <div className="footer-links">
            <h4>Navegación</h4>
            <Link to="/home">Inicio</Link>
            <Link to="/adopcion">Adopciones</Link>
          </div>

          <div className="footer-social">
            <h4>Síguenos</h4>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              <a href="https://facebook.com/huellassegurasCR" target="_blank" rel="noreferrer" title="Facebook"><FaFacebook size={26}/></a>
              <a href="https://instagram.com/huellasseguras_CR" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram size={26}/></a>
              <a href="https://twitter.com/huellasseguras" target="_blank" rel="noreferrer" title="Twitter"><FaTwitter size={26}/></a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer