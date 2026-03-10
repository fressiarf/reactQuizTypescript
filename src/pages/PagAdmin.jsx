
import Sidebar from '../components/Sidebar'
import MostrarUsuario from '../components/MostrarUsuario'

function PagAdmin() {


  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <MostrarUsuario />
        </div>
      </div>
    </>
  )
}

export default PagAdmin