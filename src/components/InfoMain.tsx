import React from 'react'
import logo from "../img/logo.png"
import { useNavigate } from 'react-router-dom'
import historia from "../img/fondo2.jpg"

function InfoMain() {
    const navigate = useNavigate()
    function irAdopcion() {
        navigate("/adopcion")
    }
  return (
    <div className="info-main-container">
        <main className="hero-section">
            <div className="hero-text">
                <h1>¿Estás listo para adoptar?</h1>
                <h2>Comienza tu búsqueda aquí</h2>
                <button className="btn-pagAdopcion" onClick={irAdopcion}>Adopta un amigo</button>
            </div>
            
            <div className="hero-logo">
                <img src={logo} alt="logo" className="small-logo" />
            </div>
        </main>
        

        <section className="historia-section">
            <h1>¿Quienes somos?</h1> 
            <img src={historia} alt="historia" className="historia-img" /> <br /> 
            <p>Somos una fundación dedicada a la protección y el bienestar animal. Nacimos con la misión de rescatar, proteger y brindar una segunda oportunidad a perros y gatos que se encuentran en situación de abandono o vulnerabilidad.

Trabajamos para conectar a estos animales con personas responsables que deseen ofrecerles un hogar lleno de amor, cuidado y respeto. A través de nuestra plataforma, facilitamos el proceso de adopción, creando un espacio seguro y confiable donde cada animal pueda encontrar la familia que merece.

Creemos firmemente en el poder transformador de la adopción y en la importancia de fomentar una cultura de empatía y responsabilidad hacia los animales. Por eso, día a día impulsamos acciones y proyectos que contribuyen a mejorar la calidad de vida de muchos perros y gatos, dándoles la oportunidad de comenzar una nueva historia.</p>
        </section>
    </div>
  )
}

export default InfoMain