<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Empresas</h2>
        <div>
          <q-btn
            icon-right="upload_file"
            class="q-mx-sm"
            borderless
            color="primary"
            label="Exportar"
          />
          <q-btn
            icon-right="note_add"
            borderless
            color="primary"
            label="Agregar"
            @click="nuevaEmpresa"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
        <q-table :rows="empresas" :columns="columns" row-key="id_empresa">
          <template v-slot:body-cell-acciones="props">
            <q-td>
              <q-btn
                @click="editarEmpresa( props.row.idEmpresa )"
                flat
                color="dark"
                icon="edit"
              >
                <q-tooltip> Editar empresa </q-tooltip>
              </q-btn>
              <q-btn
                @click="eliminarEmpresa( props.row.idEmpresa )"
                flat
                color="negative"
                icon="delete"
              >
                <q-tooltip> Eliminar empresa </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
      <ModalEmpresas ref="modalEmpresas"></ModalEmpresas>
    </q-page-container>
  </q-layout>
</template>
<script>
import { useEmpresaStore } from "../../stores/empresas"
import { formatearFecha } from "../../helpers/formatearFecha"
import ModalEmpresas from "../../components/ModalEmpresas.vue"
import { ref } from "vue"
import { storeToRefs } from "pinia"

export default {
  components: {
    ModalEmpresas,
  },
  setup() {
    const useEmpresa = useEmpresaStore()
    const { empresas } = storeToRefs( useEmpresa )
    const { eliminarEmpresa, obtenerEmpresaEditar } = useEmpresa

    const modalEmpresas = ref(null)
    const columns = [
      {
        name: 'nombreEmpresa',
        label: 'Nombre de la empresa',
        align: 'left',
        field: 'nombreEmpresa',
        sortable: true,
      },
      {
        name: "createdAt",
        label: "Fecha de registro",
        align: "left",
        field: ( row ) => formatearFecha( row.createdAt ),
        sortable: true,
      },
      {
        name: "acciones",
        label: "Acciones",
        align: "left",
        field: "acciones",
      },
    ]

    const nuevaEmpresa = () => {
      modalEmpresas.value.abrir( true )
    }
    const editarEmpresa = ( id ) => {
      obtenerEmpresaEditar( id )
      modalEmpresas.value.abrir( false )
    }
    return {
      columns,
      empresas,
      editarEmpresa,
      nuevaEmpresa,
      eliminarEmpresa,
      modalEmpresas,
    }
  },
}
</script>

<style>
</style>