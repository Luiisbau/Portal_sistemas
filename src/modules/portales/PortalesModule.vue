<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Portales</h2>
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
            @click="nuevoPortal"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
        <q-table :rows="portales" :columns="columns" row-key="id">
          <template v-slot:body-cell-acciones="props">
            <q-td>
              <q-btn
                @click="editarPortal(props.row.id)"
                flat
                color="dark"
                icon="edit"
              >
                <q-tooltip> Editar Portal </q-tooltip>
              </q-btn>
              <q-btn
                @click="eliminarPortal(props.row.id)"
                flat
                color="negative"
                icon="delete"
              >
                <q-tooltip> Eliminar Portal </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
      <ModalPortales ref="modalPortal"></ModalPortales>
    </q-page-container>
  </q-layout>
</template>
<script>
import { usePortalesStore } from "../../stores/portales";
import { formatearFecha } from "../../helpers/formatearFecha";
import ModalPortales from "../../components/ModalPortales.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  components: {
    ModalPortales,
  },
  setup() {
    const usePortal = usePortalesStore();
    const { portales } = storeToRefs(usePortal);
    const { eliminarPortal, obtenerPortales } = usePortal;

    const modalPortal = ref(null);
    const columns = [
      {
        name: "nombrePortal",
        label: "Nombre del portal",
        align: "left",
        field: "nombrePortal",
        sortable: true,
      },
      {
        name: "createdAt",
        label: "Fecha de registro",
        align: "left",
        field: (row) => formatearFecha(row.createdAt),
        sortable: true,
      },
      {
        name: "acciones",
        label: "Acciones",
        align: "left",
        field: "acciones",
      },
    ];

    const nuevoPortal = () => {
      modalPortal.value.abrirModal = true;
    };
    const editarPortal = (id) => {
      console.log(id);
    };

    onMounted(() => {
      obtenerPortales();
    });

    return {
      columns,
      portales,
      editarPortal,
      nuevoPortal,
      eliminarPortal,
      modalPortal,
    };
  },
};
</script>

<style>
</style>