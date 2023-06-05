<template>
  <div class="contenedor">
    <h2>Historial de acceso</h2>
    <q-separator color="primary" class="q-my-md" inset />
  </div>
  <div class="q-gutter-md q-mt-sm q-ml-md">
    <q-btn-dropdown color="primary" label="Filtrar usuarios">
      <q-checkbox :disable="optionsTodos" v-model="optionsTodos" label="Todos" @update:model-value="seleccionarTodos" />
      <q-option-group
      :options="options"
      type="checkbox"
      v-model="group"
      @update:model-value="filtrarTabla"
    />
    </q-btn-dropdown>
      
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

    const optionsTodos = ref(false)
    const group =  ref(['nperez', 'jpedroza', 'amagdaleno', 'ggalvan'])

    const options =  [
        { label: 'nperez', value: 'nperez' },
        { label: 'jpedroza', value: 'jpedroza' },
        { label: 'amagdaleno', value: 'amagdaleno'},
        { label: 'ggalvan', value: 'ggalvan'}

      ]

    onMounted(async() => {
      await obtenerTodosAccesos()
      informacionAccesoFiltrado.value = informacionAcceso.value
      filtrarNombre(group, informacionAccesoFiltrado, informacionAcceso, 'usuario')
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

  const filtrarTabla = () => {
    optionsTodos.value = false
    filtrarNombre(group, informacionAccesoFiltrado, informacionAcceso, 'usuario')
  }

  const seleccionarTodos = () => {
    group.value = []
    informacionAccesoFiltrado.value = informacionAcceso.value
  }

    return {
      selection,
      filter: ref(''),
      pagination: {
        sortBy: 'numero_empleado',
        descending: true,
        rowsPerPage: 10
      },
      informacionAcceso,
      informacionAccesoFiltrado,
      nombreSeleccionado,
      columns,
      group,
      options,
      filtrarTabla,
      actualizar,
      seleccionarTodos,
      optionsTodos
      //ocultarTodos
      
    }
  }
}
</script>
<style scoped>
</style>