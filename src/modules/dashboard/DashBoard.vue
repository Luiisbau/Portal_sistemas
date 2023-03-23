<template>
  <div class="contenedor">
    <h2>Inicio</h2>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="cards-dashboard">
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">person</span>
          <h3>Usuarios activos</h3>
          <p class="text-primary">{{ usuariosActivos.length }}</p>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">language</span>
          <h3>Portales registrados</h3>
          <p class="text-primary">{{ portales.length }}</p>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="q-pt-xl q-px-md" >
    <q-table
      title="Ultimos accesos"
      :rows="informacionAcceso.slice(informacionAcceso.length-10)"
      :columns="columns"
      :pagination="pagination"
      row-key="name"
    />
  </div>
</template>

<script>
import { useUsuarioStore } from "../../stores/usuarios";
import { usePortalesStore } from "../../stores/portales";
import { useInformacionAccesoStore } from "src/stores/informacionAccesos";
import { formatDate } from "src/helpers/formatearFecha";


import { storeToRefs } from "pinia";

export default {
  setup() {
    const useUsuario = useUsuarioStore();
    const { usuariosActivos } = storeToRefs(useUsuario);

    const usePortal = usePortalesStore();
    const { portales } = storeToRefs(usePortal);

    const useAccesos = useInformacionAccesoStore()
    const { informacionAcceso} = storeToRefs(useAccesos)

    const columns = [
      {
        name: "id",
        label: "id",
        align: "center",
        field: "idAcceso",
        sortable: true,
      },
      {
        name: "noEmpleado",
        label: "No. Empleado",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.numero_empleado,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.usuario,
        sortable: true,
      },
      {
        name: "nombre",
        label: "Nombre",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.nombre,
        sortable: true,
      },
      {
        name: "portal",
        label: "Portal",
        align: "center",
        field: informacionAcceso => informacionAcceso.portale.nombrePortal,
        sortable: true,
      },
      {
        name: "fechaAcceso",
        label: "Fecha de Acceso",
        align: "center",
        field: informacionAcceso => formatDate(informacionAcceso.createdAt),
        sortable: true,
      },

      
    ];

    return {
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      usuariosActivos,
      portales,
      informacionAcceso,
      columns
    }
  }
}
</script>

<style scoped>
</style>