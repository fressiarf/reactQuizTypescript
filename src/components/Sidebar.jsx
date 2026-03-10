import React from 'react';
import Swal from 'sweetalert2';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/sidebar.css';
import logo from '../img/logo2.png';


function Sidebar() {
  
  const location = useLocation();
  const navigate = useNavigate();

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
        localStorage.removeItem('usuarioLogueado');
        navigate('/login');
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has salido correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  };

  
  const menuItems = [
    { path: '/home', label: 'Inicio', isHome: true },
    { path: '/adopcion', label: 'Adopciones' },
    { path: '/perfil', label: 'Mi Perfil' },
    { isDivider: true },
    { path: '/admin', label: 'Administración' },
    { path: '/admin-adopcion', label: 'Gestionar Adopciones' },
    { path: '/admin-solicitudes', label: 'Solicitudes Adopción' },
    { isDivider: true },
    { label: 'Ajustes', disabled: true }
  ];

  
  const checkActive = (path, isHome) => {
    if (isHome && (location.pathname === '/' || location.pathname === '/home')) return 'active';
    return location.pathname === path ? 'active' : '';
  };

 
  const navigationLinks = menuItems.map((item, index) => {
    if (item.isDivider) {
      return <div key={`divider-${index}`} className="sidebar-divider"></div>;
    }

    if (item.disabled) {
      return (
        <Nav.Link key={`link-${index}`} className="sidebar-link disabled">
          <span>{item.label}</span>
        </Nav.Link>
      );
    }

    return (
      <Nav.Link 
        key={item.path}
        as={Link} 
        to={item.path} 
        className={`sidebar-link ${checkActive(item.path, item.isHome)}`}
      >
        <span>{item.label}</span>
      </Nav.Link>
    );
  });

 
  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <Link to="/home">
          <img src={logo} alt="logo" className='logo' />
        </Link>
        <h5>Menú Principal</h5>
      </div>
      
      <Nav className="flex-column sidebar-nav">
        {navigationLinks}
      </Nav>

      <div className="sidebar-footer">
        <button onClick={cerrarSesion} className="btnCerrarSesion">
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;