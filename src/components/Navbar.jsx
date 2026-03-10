import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import logo2 from "../img/logo2.png"
import "../style/nav.css"
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

function Navbar() {

  const navigate = useNavigate()
  const [userLogeado, setUserLogeado] = useState(JSON.parse(localStorage.getItem("usuarioLogueado")))

  const cerrarSesion = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará tu sesión actual.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4e73df',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuarioLogueado")
        setUserLogeado(null)
        navigate("/")
        
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has salido correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  }
  const socialIcons = (
    <div className="nav-socials">
      <a href="https://facebook.com/huellassegurasCR" target="_blank" rel="noreferrer" title="Facebook"><FaFacebook size={22}/></a>
      <a href="https://instagram.com/huellasseguras_CR" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram size={22}/></a>
      <a href="https://twitter.com/huellasseguras_CR" target="_blank" rel="noreferrer" title="Twitter"><FaTwitter size={22}/></a>
    </div>
  )

  let contenidoNav
  if (userLogeado) {
    if (userLogeado.rol === "Admin") {
      contenidoNav = (
        <>
          <Nav className="nav" activeKey="/home">
          {socialIcons}
          <Nav.Item>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/perfil">Perfil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/mis-solicitudes">Mis Solicitudes</Nav.Link>
            </Nav.Item>
            <button onClick={cerrarSesion} className='btnCerrarSesion'>Cerrar sesión</button>
          </Nav>
        </>
      )
    } else {
      contenidoNav = (
        <>
          <Nav className="nav" activeKey="/home">
            {socialIcons}
            <Nav.Item>
              <Nav.Link href="/perfil">Perfil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/mis-solicitudes">Mis Solicitudes</Nav.Link>
            </Nav.Item>
            <button onClick={cerrarSesion} className='btnCerrarSesion'>Cerrar sesión</button>
          </Nav>
        </>
      )
    }
} else {
    contenidoNav = (
      <>
        <Nav className="nav" activeKey="/home">
          {socialIcons}
          <Nav.Item>
            <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    )
  }
  return (
    <div className="nav-container">
      <header className="nav-header">
        <div className="logo-container">
          <Link to="/home">
            <img src={logo2} alt="logo" className='logo' />
          </Link>
          <h1 className="logoText">Red huellas Seguras</h1>
        </div>

        <nav className="nav-menu">
          <div className="nav-links">
            {contenidoNav}
          </div>
        </nav>

      </header>
    </div>
  )
}

export default Navbar
