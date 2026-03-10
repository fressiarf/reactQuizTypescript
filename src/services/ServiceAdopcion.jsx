async function getAdopciones() {

    try {

        const respuestaServidor = await fetch("http://localhost:3001/adopciones")
      
        
        const datosAdopciones= await respuestaServidor.json();
   
        
        return datosAdopciones;
        
    } catch (error) {
        
        console.error("Error al obtener las adopciones", error);
    }


}








async function postAdopciones(adopcion){

       try {

        const respuesta = await fetch("http://localhost:3001/adopciones",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(adopcion)

        })

        const datosAdopciones= await respuesta.json();

        return datosAdopciones;
        
    } catch (error) {
        
        console.error("Error al obtener las adopciones", error);
    }
}






async function patchAdopciones(adopcion,id){

       try {

        const respuesta = await fetch("http://localhost:3001/adopciones/"+id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(adopcion)

        })

        const datosAdopciones= await respuesta.json();

        return datosAdopciones;
        
    } catch (error) {
        
        console.error("Error al actualizar las adopciones", error);
    }
}






async function deleteAdopciones(id){

       try {

        const respuesta = await fetch("http://localhost:3001/adopciones/"+id,{
            method:"DELETE",
        })

        const datosAdopciones= await respuesta.json();

        return datosAdopciones;
        
    } catch (error) {
        
        console.error("Error al Eliminar el registro", error);
    }
}




export default {postAdopciones,getAdopciones,patchAdopciones,deleteAdopciones}