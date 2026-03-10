import React from 'react'
import Sidebar from '../components/Sidebar'
import GestionarSolicitudes from '../components/GestionarSolicitudes'

function AdminSolicitudes() {

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <GestionarSolicitudes />
        </div>
      </div>
    </>
  )
}

export default AdminSolicitudes
