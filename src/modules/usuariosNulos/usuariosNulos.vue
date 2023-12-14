<template>
    <q-layout>
      <div class="q-pa-md">
        <div div class="q-pa-md">
          <h2>Usuarios nulos</h2>
        </div>
        <q-separator color="primary" class="q-my-md" inset />
        <q-table
          color="primary"
          :loading="cargando"
          :rows="usuariosNulos"
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
              <q-btn flat color="dark" icon="edit" @click="editarUsuario(props.row)">
                <q-tooltip> Editar Usuario </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-layout>
    <modal-editar-usuario ref="modalUsuario"></modal-editar-usuario>
  </template>

  <script>
  import { onMounted, ref } from "vue";
  import { useUsuarioStore } from "../../stores/usuarios";
  import { storeToRefs } from "pinia";
  import ModalEditarUsuario from "src/components/ModalEditarUsuario.vue";

  export default {
    components:{
      ModalEditarUsuario
    },
    setup() {
      const useUsuario = useUsuarioStore();
      const { cargando, usuariosActivos, usuariosNulos } = storeToRefs(useUsuario);
      const { obtenerUsuarios } = useUsuario;

      const modalUsuario = ref(null)
      const columns = [
      {
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
        },
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
          field: (row) => (row.usuario ? row.usuario : "Sin usuario"),
          align: "left",
          sortable: true,
        },
        {
          name: "correo",
          label: "Correo",
          field: (row) => (row.correo ? row.correo : "Sin correo"),
          align: "left",
          sortable: true,
        },
        {
          name: "puesto",
          label: "Puesto",
          field: (row) => (row.puesto ? row.puesto : "Sin puesto"),
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_alta",
          label: "Fecha de alta",
          field: 'fechaAlta',
          align: "center",
          sortable: true,
        },
        {
          name: "id_puesto",
          label: "id puesto",
          field: "idPuesto",
          align: "left",
          sortable: true,
        },
        {
          name: "departamento",
          label: 'Departamento',
          field: "departamento",
          align: "left",
          sortable: true,
        },
        {
          name: "centro_trabajo",
          label: 'Centro de trabajo',
          field: "centroTrabajo",
          align: "left",
          sortable: true,
        },
        {
          name: "id_departamento_sucursal",
          label: 'id departamento sucursal',
          field: "idDepartamentoSucursal",
          align: "left",
          sortable: true,
        },
        {
          name: "siglas_centro_trabajo",
          label: 'Siglas centro de trabajo',
          field: "siglasCentroTrabajo",
          align: "left",
          sortable: true,
        },
      ];

      onMounted(() => {
        console.log(usuariosActivos)
        obtenerUsuarios();
      });

      const editarUsuario = (data) =>{
        modalUsuario.value.edtiarUsuario(data)
      }

      return {
        pagination: {
          sortBy: 'id',
          descending: true,
          rowsPerPage: 10
        },
        modalUsuario,
        columns,
        cargando,
        usuariosNulos,
        usuariosActivos,
        buscar: ref(""),
        editarUsuario
      };
    },
  };
  </script>

  <style>
  </style>
