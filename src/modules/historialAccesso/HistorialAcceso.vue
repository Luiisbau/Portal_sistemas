<template>
  <div class="contenedor">
    <h2>Historial de acceso</h2>
    <q-separator color="primary" class="q-my-md" inset />
  </div>

  <div class="q-pt-xl q-px-md" >
    <q-table
      title="Ultimos accesos"
      :rows="informacionAcceso"
      :columns="columns"
      :pagination="pagination"
      :filter="filter"
      row-key="name"
    >
    <template v-slot:top-right="props">
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                        <template v-slot:append>
                            <q-icon color="primary" name="search" />
                        </template>
                    </q-input>

                    <q-btn flat round color="primary" dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="props.toggleFullscreen" class="q-ml-md" />
                </template>
  </q-table>
  </div>
</template>

<script>
import { useInformacionAccesoStore } from "src/stores/informacionAccesos";
import { formatDate } from "src/helpers/formatearFecha";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {

    const useAccesos = useInformacionAccesoStore()
    const {obtenerTodosAccesos} = useAccesos
    const { informacionAcceso} = storeToRefs(useAccesos)

    onMounted(async() => {
      await obtenerTodosAccesos()
    })

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
      filter: ref(''),
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      informacionAcceso,
      columns
    }
  }
}
</script>

<style scoped>
</style>