<template>
  <q-layout>
    <div class="q-pa-md">
      <div div class="q-pa-md">
        <h2>Permisos de Usuarios</h2>
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
            @click="nuevoPermiso"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <!-- :loading="cargando" -->

      <q-table
        color="primary"
        :rows="permisos"
        :columns="columns"
        :filter="buscar"
      >
        <template v-slot:top>
          <div class="fit row q-gutter-sm">
            <div class="col">
              <q-select
                outlined
                dense
                :options="filtrosUsuarios"
                v-model="filtroSeleccionado"
                map-options
                option-value="name"
              />
            </div>
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
              @click="editarPermiso(props.row.id_permiso)"
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
    <ModalPermisos ref="modalPermisos"></ModalPermisos>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { usePermisoStore } from "../../stores/permisos";
import ModalPermisos from "../../components/ModalPermisos.vue";

export default {
  components: {
    ModalPermisos,
  },
  setup() {
    const modalPermisos = ref(null);
    const usePermiso = usePermisoStore();
    const { permisos } = storeToRefs(usePermiso);

    const columns = [
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
        field: "puesto",
        align: "left",
        sortable: true,
      },
      {
        name: "nombreEmpresa",
        label: "Nombre de la empresa",
        field: "nombreEmpresa",
        align: "left",
        sortable: true,
      },
      {
        name: "nombrePortal",
        label: "Nombre del portal",
        field: "nombrePortal",
        align: "left",
        sortable: true,
      },
      {
        name: "nombreRol",
        label: "Nombre del rol",
        field: "nombreRol",
        align: "left",
        sortable: true,
      },
      {
        name: "nombreSucursal",
        label: "Nombre de la sucursal",
        field: "nombreSucursal",
        align: "left",
        sortable: true,
      },
      {
        name: "activo",
        label: "Permiso Activo",
        field: (row) => (row.activo ? "Si" : "No"),
        align: "left",
        sortable: true,
      },
      {
        name: "acciones",
        label: "Acciones",
        field: "acciones",
        align: "left",
        sortable: true,
      },
    ];
    const filtrosUsuarios = ["Solo los activos", "Solo los inactivos"];

    const nuevoPermiso = () => {
      modalPermisos.value.abrir(true);
    };

    const editarPermiso = (id) => {
      console.log(id);
    };

    return {
      columns,
      nuevoPermiso,
      modalPermisos,
      ModalPermisos,
      filtrosUsuarios,
      editarPermiso,
      permisos,
      filtroSeleccionado: ref("Solo los activos"),
      buscar: ref(""),
    };
  },
};
</script>

<style>
</style>