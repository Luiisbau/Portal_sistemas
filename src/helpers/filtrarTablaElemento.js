export const filtrarNombre = (elementoSeleccionado, estate, opciones, elementoFiltrar) => {

  const opcionesFiltrado = opciones.value.filter(elemento => {
    console.log(elemento.usuario)
    return !elementoSeleccionado.value.includes(elemento.usuario[elementoFiltrar])
  })
  estate.value = opcionesFiltrado;
  }
