import React, { useState, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import ServiceUsuario from '../services/ServiceUsuario';
import "../style/register.css";
import { useNavigate } from "react-router-dom";

type Usuario = {
    nombre: string;
    contra: string;
    correo: string;
    rol: string;
    fotoPerfil: string;
    telefono?: string; // Opcional porque en el Admin no lo pones
}

function FormRegistro() {
    const navigate = useNavigate();

    // 2. Tipamos los estados (aunque TS los infiere como string, es buena práctica)
    const [nombreCompleto, setNombreUsuario] = useState<string>("");
    const [contraUsuario, setContraUsuario] = useState<string>("");
    const [correoUsuario, setCorreoUsuario] = useState<string>("");
    const [telefonoUsuario, setTelefonoUsuario] = useState<string>("");
    const [fotoPerfil, setFotoPerfil] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPerfil(reader.result as string); // 'as string' porque result puede ser ArrayBuffer
            };
            reader.readAsDataURL(file);
        }
    }

    async function registroUsuario(): Promise<void> {
        if (!nombreCompleto || !contraUsuario || !correoUsuario || !telefonoUsuario) {
            Swal.fire({
                title: '¡error!',
                text: 'todos los campos deben estar llenos',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            }); 
            return;
        }

        // ... (tus validaciones de Regex se mantienen igual)

        // 4. Tipamos la respuesta del servicio
        const datoGuardar: Usuario[] = await ServiceUsuario.getUsuarios();

        const objUsuario: Usuario = {
            nombre: nombreCompleto,
            contra: contraUsuario,
            correo: correoUsuario,
            rol: datoGuardar.length === 0 ? "Admin" : "usuario",
            fotoPerfil: fotoPerfil,
            ...(datoGuardar.length !== 0 && { telefono: telefonoUsuario }) // Añadir teléfono solo si no es admin
        };

        const usuarioAlmacenado = await ServiceUsuario.postUsuarios(objUsuario);

        if (usuarioAlmacenado) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'La operación se realizó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/login');
            });
             
            setNombreUsuario("");
            setContraUsuario("");
            setCorreoUsuario("");
            setTelefonoUsuario("");
            setFotoPerfil("");
        }
    }

    const irInicioSesion = (): void => {
        navigate('/login');
    }

    // 5. Tipamos el evento de cambio en inputs de texto
    const handleTelefonoChange = (evento: ChangeEvent<HTMLInputElement>): void => {
        const value = evento.target.value;
        if (value.startsWith('-')) return;
        setTelefonoUsuario(value);
    };

    return (
        // ... El JSX se mantiene prácticamente igual
        <div className='formRegistro'>
             {/* ... rest of your JSX */}
             <input 
                type="text" 
                value={nombreCompleto} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNombreUsuario(e.target.value)} 
                placeholder="Ej: Juan Pérez" 
            />
             {/* ... */}
        </div>
    );
}

export default FormRegistro;