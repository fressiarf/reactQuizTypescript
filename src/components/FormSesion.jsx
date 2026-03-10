import React, { useState } from 'react'
import Swal from 'sweetalert2'
import ServiceUsuario from '../services/ServiceUsuario'
import "../style/login.css"
import { useNavigate } from "react-router-dom"

import logo from '../img/logo.png'

function FormSesion() {

  const [contraLogin, setContraLogin] = useState("")
  const [correoLogin, setCorreoLogin] = useState("")
  const navigate = useNavigate()

  async function loginUsuario() {
    if (!contraLogin || !correoLogin) {
      Swal.fire({
        title: '¡error!',
        text: 'todos los campos deben estar llenos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else {
      const datosUsuario = await ServiceUsuario.getUsuarios()
      const usuarioRegistrado = datosUsuario.find(usuario => usuario.correo === correoLogin)
      if (!usuarioRegistrado) {
        Swal.fire({
          title: "Error",
          text: "Este correo no está registrado",
          icon: "error",
          confirmButtonText: "OK"
        });
      } else {
        const credencialesValidas = datosUsuario.find(usuario => usuario.correo === correoLogin && usuario.contra === contraLogin)
        if (!credencialesValidas) {
          Swal.fire({
            title: "Error",
            text: "Credenciales incorrectas",
            icon: "error",
            confirmButtonText: "OK"
          });
        } else {
          localStorage.setItem("usuarioLogueado", JSON.stringify(credencialesValidas));
          Swal.fire({
            title: "inicio exitoso",
            text: "credenciales correctas",
            icon: "success",
            confirmButtonText: "OK"
          }).then(() => {
            navigate('/home')
          })
        }
      }
    }
  }

  function regirigirAdmin() {
    navigate('/registro')
  }

  return (
    <div className='formLogin'>
    
      <div className="login-left">
        <img src={logo} alt="Red Huellas Seguras Logo" className="logo-form" />
        <div className="decor-box">
          <h3>¡Bienvenido de nuevo!</h3>
          <p>Tus amigos peludos te han extrañado. Inicia sesión para seguir ayudando.</p>
        </div>
      </div>

     
      <div className="login-right">
        <div className="already-account">
          <p>¿No tienes una cuenta?</p>
          <button onClick={regirigirAdmin} className="btn-link-login">Regístrate aquí</button>
        </div>

        <h2>Inicio de Sesión</h2>

        <div className="form-group-login">
          <h4>Correo Electrónico</h4>
          <input 
            type="email" 
            value={correoLogin} 
            onChange={(evento) => setCorreoLogin(evento.target.value)} 
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="form-group-login">
          <h4>Contraseña</h4>
          <input 
            type="password" 
            value={contraLogin} 
            onChange={(evento) => setContraLogin(evento.target.value)} 
            placeholder="Introduce tu contraseña"
          />
        </div>

        <div className="form-actions-login">
          <button onClick={loginUsuario} className="btn-primary-login">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  )
}


export default FormSesion
