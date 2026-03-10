import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MisSolicitudes from '../components/MisSolicitudes'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function PagMisSolicitudes() {
  const navigate = useNavigate()
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  useEffect(() => {
    const sesion = localStorage.getItem('usuarioLogueado')
    if (sesion) {
      setUsuarioLogueado(JSON.parse(sesion))
    } else {
      navigate('/login')
    }
  }, [navigate])

  if (!usuarioLogueado) return null;

  return (
    <>
      <Navbar />
      <div style={{minHeight: '80vh', padding: '40px 20px'}}>
        <MisSolicitudes usuarioId={usuarioLogueado.id} />
      </div>
      <Footer />
    </>
  )
}

export default PagMisSolicitudes
