/* /GET USUARIOS funcion que consulta al endpoint a traves de un fetch,conuslta al API al Endpoint*/
async function getPerfil() {

    try {

        const respuestaServidor = await fetch("http://localhost:3001/usuarios")
      
        
        const datosUsuarios= await respuestaServidor.json();
   
        
        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al obtener los perfiles", error);
    }


}








async function postPerfil(perfil){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(perfil)

        })

        const datosPerfil= await respuesta.json();

        return datosPerfil;
        
    } catch (error) {
        
        console.error("Error al obtener los perfiles", error);
    }
}






async function patchPerfil(perfil,id){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(perfil)

        })

        const datosPerfil= await respuesta.json();

        return datosPerfil;
        
    } catch (error) {
        
        console.error("Error al actualizar los cambios", error);
    }
}






async function deletePerfil(id){

       try {

        const respuesta = await fetch("http://localhost:3001/usuarios/"+id,{
            method:"DELETE",
        })

        const datosUsuarios= await respuesta.json();

        return datosUsuarios;
        
    } catch (error) {
        
        console.error("Error al Eliminar el perfil", error);
    }
}




export default {postPerfil,getPerfil,patchPerfil,deletePerfil}



