<template>
  <div class="contenedor">
    <h2>Historial de acceso</h2>
    <q-separator color="primary" class="q-my-md" inset />
  </div>
  <div class="q-gutter-md q-mt-sm">
    <q-row class= row>
      <q-col class="q-pa-sm q-ml-sm">
    <q-btn-dropdown color="primary" label="Programación">
        <div>
          <q-toggle v-model="selection" label="jpedroza" val="jpedroza"/>
        </div>
        <div>
          <q-toggle v-model="selection" label="nperez" val="nperez"/>
        </div>
        <div>
          <q-toggle v-model="selection" label="amagdaleno" val="amagdaleno"/>
        </div>
        <div>
          <q-toggle v-model="selection" label="vmerino" val="vmerino"/>
        </div>
    </q-btn-dropdown>
  </q-col>
  <q-col class="q-pa-sm ">
      <q-btn color="primary" label="Actualizar" :value="actualizar" @click="cambiarActualizar"  />
  </q-col>
  </q-row>
  </div>

  <div class="q-pt-md q-px-md" >
    <q-table
      title="Ultimos accesos"
      :rows="informacionAccesoFiltrado"
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
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import {filtrarNombre} from "src/helpers/filtrarTablaElemento";


export default {
  setup() {

    const useAccesos = useInformacionAccesoStore()
    const {obtenerTodosAccesos} = useAccesos
    const { informacionAcceso} = storeToRefs(useAccesos)
    const informacionAccesoFiltrado = ref([])
    const selection = ref([])
    const nombreSeleccionado = ref('')
    const actualizar = ref(true)

    watch(selection, (newVal, oldVal) => {
      filtrarNombre(newVal, informacionAcceso, informacionAccesoFiltrado)
    })

    const reset = () => {
  informacionAccesoFiltrado.value = informacionAcceso.value
  selection.value = ([])
  const toggles = document.querySelectorAll('.q-toggle')
  toggles.forEach(toggle => {
    toggle.__vue__.value = false
  })
}

const cambiarActualizar = () => {
  actualizar.value = !actualizar.value
  if (actualizar.value) {
    reset()
  } else {
    selection.value = ['jpedroza', 'nperez', 'amagdaleno', 'vmerino']
    filtrarNombre(selection.value, informacionAcceso, informacionAccesoFiltrado)
  }
}

    onMounted(async() => {
      await obtenerTodosAccesos()
      informacionAccesoFiltrado.value = informacionAcceso.value
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
      selection,
      filter: ref(''),
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      informacionAcceso,
      informacionAccesoFiltrado,
      nombreSeleccionado,
      columns,
      reset,
      cambiarActualizar,
      actualizar
      //ocultarTodos
      
      
    }
  }
}
</script>
<style scoped>
</style>