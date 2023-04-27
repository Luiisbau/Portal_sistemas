export const filtrarNombre = (
  nombre,
  informacionAcceso,
  informacionAccesoFiltrado,
  nombreSeleccionado = { value: nombre }
) => {
  nombreSeleccionado.value = nombre;
  informacionAccesoFiltrado.value = informacionAcceso.value.filter(
    (acceso) => !nombre.includes(acceso.usuario.usuario)
  );
};
