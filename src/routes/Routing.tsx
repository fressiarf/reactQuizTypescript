import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "../pages/Home";
import PagAdmin from "../pages/PagAdmin";
import CrudUsuarios from "../pages/CrudUsuarios";
import InicioSesion from "../pages/InicioSesion"
import PerfilUsuario from "../pages/PerfilUsuario"
import PagAdopcion from "../pages/PagAdopcion"
import PagFormAdopcion from "../pages/PagFormAdopcion"
import AdminAdopcion from "../pages/AdminAdopcion"
import AdminSolicitudes from "../pages/AdminSolicitudes"
import PagMisSolicitudes from "../pages/PagMisSolicitudes"
import PrivateRoutes from "./PrivateRoutes"


const Routing = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registro" element={<CrudUsuarios />} />
                <Route path="/login" element={<InicioSesion />} />
                <Route path="/adopcion" element={<PagAdopcion />} />


                {/*  De aquía para abajo va mis rutas privadas */}
                <Route path="/admin" element={<PrivateRoutes><PagAdmin /></PrivateRoutes>} />
                <Route path="/perfil" element={<PrivateRoutes><PerfilUsuario /></PrivateRoutes>} />
                <Route path="/formulario-adopcion" element={<PrivateRoutes><PagFormAdopcion /></PrivateRoutes>} />
                <Route path="/admin-adopcion" element={<PrivateRoutes><AdminAdopcion /></PrivateRoutes>} />
                <Route path="/admin-solicitudes" element={<PrivateRoutes><AdminSolicitudes /></PrivateRoutes>} />
                <Route path="/mis-solicitudes" element={<PrivateRoutes><PagMisSolicitudes /></PrivateRoutes>} />


            </Routes>
        </Router>

    )

}

export default Routing