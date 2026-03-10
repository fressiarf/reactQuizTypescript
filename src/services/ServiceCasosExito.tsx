
async function getCasosExito() {
    try {
        const respuesta = await fetch("http://localhost:3001/casosExito");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los casos de éxito", error);
    }
}

export default { getCasosExito };
