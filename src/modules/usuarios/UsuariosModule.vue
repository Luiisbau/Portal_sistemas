<template>
  <q-layout>
    <div class="q-pa-md">
      <div div class="q-pa-md">
        <h2>{{  nombrePortal  }}</h2>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
      <q-table
        color="primary"
        :loading="cargando"
        :rows="usuariosActivos"
        :columns="columns"
        :filter="buscar"
        :pagination="pagination"
      >
        <template v-slot:top>
          <div class="fit row q-gutter-sm">

            <div class="col-6">
              <q-input
                outlined
                dense
                debounce="300"
                v-model="buscar"
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>
        <template v-slot:body-cell-acciones="props">
          <q-td>
            <q-btn
                @click="editarUsuario(props.row)"
                flat
                color="dark"
                icon="edit"
              >
                <q-tooltip> Editar Usuario </q-tooltip>
              </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    </div>
  </q-layout>
  <modal-editar-usuario ref="modalUsuario"></modal-editar-usuario>
</template>

<script>
import { onMounted, ref } from "vue"
import { storeToRefs } from "pinia"

import { useUsuarioStore } from "src/stores/usuarios"
import ModalEditarUsuario from "src/components/ModalEditarUsuario.vue"

export default {
  components:{
    ModalEditarUsuario
  },
  setup() {
    const useUsuario = useUsuarioStore()
    const { cargando, usuariosActivos, nombrePortal } = storeToRefs(useUsuario)
    const { obtenerUsuarios } = useUsuario;


    const modalUsuario = ref(null)
    const columns = [
  /*  {
        name: "id",
        label: "id",
        field: 'idUsuario',
        align: "center",
        sortable: true,
     },
      {
        name: "numeroEmpleado",
        label: "Numero de empleado",
        field: (row) =>
          row.numeroEmpleado ? row.numeroEmpleado : "Sin numero de empleado",
        align: "center",
        sortable: true,
      },*/
      {
        name: "nombre",
        label: "Nombre completo",
        field: "nombre",
        align: "left",
        sortable: true,
      },
      {
        name: "usuario",
        label: "Usuario",
        field: "usuario",
        align: "left",
        sortable: true,
      },
  /*    {
        name: "puesto",
        label: "Puesto",
        field: (row) => (row.puesto ? row.puesto : "Sin puesto"),
        align: "left",
        sortable: true,
      },
      {
        name: "dpartamento",
        label: "Departamento",
        field: 'departamento',
        align: "center",
        sortable: true,
      },*/
      {
        name: "dpartamento",
        label: "centro de trabajo",
        field: 'siglasCentroTrabajo',
        align: "center",
        sortable: true,
      },
   /*   {
        name: "correo",
        label: "Correo",
        field: "correo",
        align: "left",
        sortable: true,
      },*/
      {
        name: "acciones",
        field: "acciones",
        align: "left",
        sortable: true,
      },
    ];

    onMounted(() => {
      nombrePortal.value = 'Modulo Usuarios'
      obtenerUsuarios();
    });

    const editarUsuario = (data) =>{
      modalUsuario.value.editarUsuario(data)
    };


    return {
      //state
      nombrePortal,
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      modalUsuario,
      columns,
      cargando,
      usuariosActivos,
      buscar: ref(""),
      editarUsuario
    };
  },
};
</script>

<style>
</style>
