export const filtrarNombre = (elementoSeleccionado, estate, opciones, elementoFiltrar) => {

  const opcionesFiltrado = opciones.value.filter(elemento => {
    return !elementoSeleccionado.value.includes(elemento.usuario[elementoFiltrar])
  })
  estate.value = opcionesFiltrado;
}
