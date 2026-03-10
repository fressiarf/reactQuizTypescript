import Sidebar from '../components/Sidebar'
import GestionarAdopciones from '../components/GestionarAdopciones'

function AdminAdopcion() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        <GestionarAdopciones />
      </div>
    </div>
  )
}

export default AdminAdopcion