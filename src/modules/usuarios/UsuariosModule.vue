<template>
  <q-layout>
    <div class="q-pa-md">
      <div div class="q-pa-md">
        <h2>Usuarios</h2>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
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
        <template v-slot:body-cell-acciones>
          <q-td>
            <q-btn flat color="dark" icon="edit">
              <q-tooltip> Editar Usuario </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useUsuarioStore } from "../../stores/usuarios";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const useUsuario = useUsuarioStore();
    const { cargando, usuariosActivos } = storeToRefs(useUsuario);
    const { obtenerUsuarios } = useUsuario;

    const columns = [
    {
        name: "id",
        label: "id",
        field: 'idUsuario',
        align: "center",
        sortable: true,
      },
      {
        name: "numero_empleado",
        label: "Numero de empleado",
        field: (row) =>
          row.numero_empleado ? row.numero_empleado : "Sin numero de empleado",
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
        field: "usuario",
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
        name: "correo",
        label: "Correo",
        field: "correo",
        align: "left",
        sortable: true,
      },
      {
        name: "acciones",
        field: "acciones",
        align: "left",
        sortable: true,
      },
    ];
    const filtrosUsuarios = ["Solo los activos", "Solo los dados de baja"];

    onMounted(() => {
      obtenerUsuarios();
    });

    return {
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10

      },
      columns,
      cargando,
      usuariosActivos,
      filtrosUsuarios,
      filtroSeleccionado: ref("Solo los activos"),
      buscar: ref(""),
    };
  },
};
</script>

<style>
</style>