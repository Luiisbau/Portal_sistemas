
export const editarRegistros = ( nuevoRegistro, registroLleno, esNuevoRegistro ) => {
    let objetoNuevo = nuevoRegistro

    // si nuevo registro lleno tiene algo, entonces sobre ese itera en las propiedades ( key )
    Object.keys( registroLleno || nuevoRegistro ).forEach( key =>  {
        objetoNuevo[key] = esNuevoRegistro ? nuevoRegistro[key] : registroLleno[key]
    })
    return objetoNuevo
}