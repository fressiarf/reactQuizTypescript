const URL_API = "http://localhost:3001/solicitudes"

const ServiceSolicitud = {

    getSolicitudes: async () => {
        try {
            const peticion = await fetch(URL_API)
            if (!peticion.ok) throw new Error("Error al obtener solicitudes")
            return await peticion.json()
        } catch (error) {
            console.error(error)
            return null
        }
    },

    postSolicitud: async (solicitud) => {
        try {
            const peticion = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(solicitud)
            })
            if (!peticion.ok) throw new Error("Error al guardar la solicitud")
            return await peticion.json()
        } catch (error) {
            console.error(error)
            return null
        }
    },

    deleteSolicitud: async (id) => {
        try {
            const peticion = await fetch(`${URL_API}/${id}`, {
                method: 'DELETE'
            })
            if (!peticion.ok) throw new Error("Error al eliminar la solicitud")
            return await peticion.json()
        } catch (error) {
            console.error(error)
            return null
        }
    },

    patchSolicitud: async (id, actualizacion) => {
        try {
            const peticion = await fetch(`${URL_API}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualizacion)
            })
            if (!peticion.ok) throw new Error("Error al actualizar la solicitud")
            return await peticion.json()
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default ServiceSolicitud
