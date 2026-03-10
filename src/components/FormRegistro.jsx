import React, { useState } from 'react'
import Swal from 'sweetalert2'
import ServiceUsuario from '../services/ServiceUsuario'
import "../style/register.css"
import { useNavigate  } from "react-router-dom"

import logo from '../img/logo.png'

function FormRegistro() {

 const navigate = useNavigate();

    const [nombreCompleto, setNombreUsuario] = useState("")
    const [contraUsuario, setContraUsuario] = useState("")
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [telefonoUsuario, setTelefonoUsuario] = useState("")
    const [fotoPerfil, setFotoPerfil] = useState("")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFotoPerfil(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    async function registroUsuario() {

        if (!nombreCompleto || !contraUsuario || !correoUsuario || !telefonoUsuario) {
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            }); 
            return;
        }


        if (!/\.(com|net|org|edu|gov|cr)$/i.test(correoUsuario)) {
            Swal.fire({
                icon: 'warning',
                title: 'Correo Inválido',
                text: 'El correo debe terminar en un dominio válido (ej. .com, .net, .org, .cr).',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoUsuario)) {
            Swal.fire({
                icon: 'warning',
                title: 'Correo Inválido',
                text: 'Ingrese un formato de correo electrónico válido.',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        if (contraUsuario.length < 8) {
            Swal.fire({
                icon: 'warning',
                title: 'Contraseña Débil',
                text: 'La contraseña debe tener al menos 8 caracteres.',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        if (!/^[0-9]{4}-?[0-9]{4}$/.test(telefonoUsuario)) {
            Swal.fire({
                icon: 'warning',
                title: 'Teléfono Inválido',
                text: 'El teléfono debe tener 8 dígitos numéricos (se permite un guion).',
                confirmButtonColor: '#4e73df'
            });
            return;
        }

        let usuarioAlmacenado = {}
        const datoGuardar = await ServiceUsuario.getUsuarios()

        if (datoGuardar.length  === 0) {
            const objUsuario = {
                nombre: nombreCompleto,
                contra: contraUsuario,
                correo: correoUsuario,
                rol: "Admin",
                fotoPerfil: fotoPerfil
            }
            usuarioAlmacenado = await ServiceUsuario.postUsuarios(objUsuario)
        } else {
            const objUsuario = {
                nombre: nombreCompleto,
                contra: contraUsuario,
                correo: correoUsuario,
                rol: "usuario",
                telefono: telefonoUsuario,
                fotoPerfil: fotoPerfil
            }
            usuarioAlmacenado = await ServiceUsuario.postUsuarios(objUsuario)
        }

        if (usuarioAlmacenado) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'La operación se realizó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/login') 
            })
             
            setNombreUsuario("")
            setContraUsuario("")
            setCorreoUsuario("")
            setTelefonoUsuario("")
            setFotoPerfil("")
        }
    }

    function irInicioSesion () {
        navigate('/login')
    }

    const handleTelefonoChange = (evento) => {
        const value = evento.target.value;
        if (value.startsWith('-')) {
            return;
        }
        setTelefonoUsuario(value);
    };

    return (
        <div className='formRegistro'>

            <div className="registro-left">
                <img src={logo} alt="Logo" className="logo-form" />
                <div className="decor-box">
                    <h3>¡Hagámoslo realidad juntos!</h3>
                    <p>Únete a nuestra comunidad y ayuda a más huellas a encontrar un hogar seguro.</p>
                </div>
            </div>


            <div className="registro-right">
                <div className="already-account">
                    <p>¿Ya tienes una cuenta?</p>
                    <button onClick={irInicioSesion} className="btn-link-reg">Inicia sesión aquí</button>
                </div>

                <h2>Registro</h2>

                <div className="image-upload-container">
                    <input type="file" accept="image/*" onChange={handleFileChange} id="foto-input" style={{display: 'none'}} />
                    <label htmlFor="foto-input" className="btn-upload-circle">
                        <img 
                            src={fotoPerfil || "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-usuario_157943-15752.jpg"} 
                            alt="Preview" 
                            className="preview-circular" 
                        />
                        <div className="overlay-upload"><span>+</span></div>
                    </label>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <h4>Nombre completo</h4>
                        <input type="text" value={nombreCompleto} onChange={(evento) => setNombreUsuario(evento.target.value)} placeholder="Ej: Juan Pérez" />
                    </div>
                    <div className="form-group">
                        <h4>Correo</h4>
                        <input type="email" value={correoUsuario} onChange={(evento) => setCorreoUsuario(evento.target.value)} placeholder="ejemplo@correo.com" />
                    </div>
                    <div className="form-group">
                        <h4 >Contraseña</h4>
                        <input type="password" value={contraUsuario} onChange={(evento) => setContraUsuario(evento.target.value)} placeholder="Min. 8 caracteres" />
                    </div>
                    <div className="form-group">
                        <h4>Teléfono</h4>
                        <input type="text" value={telefonoUsuario} onChange={handleTelefonoChange} placeholder="8 dígitos" />
                    </div>
                </div>
                
                <div className="form-actions">
                    <button onClick={registroUsuario} className="btn-primary-reg">Crear Cuenta</button>
                </div>
            </div>
        </div>
    )
}

export default FormRegistro