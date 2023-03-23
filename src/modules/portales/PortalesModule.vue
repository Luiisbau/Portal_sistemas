<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Portales</h2>
        <div>
          <q-btn
            icon-right="note_add"
            borderless
            color="primary"
            label="Agregar portal"
            no-caps
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
                @click="editarPortal(props.row)"
                flat
                color="dark"
                icon="edit"
              >
                <q-tooltip> Editar Portal </q-tooltip>
              </q-btn>
              <q-btn
                @click="eliminarPortal(props.row)"
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
      <ModalEliminarPortal ref="modalEliminar"></ModalEliminarPortal>
    </q-page-container>
  </q-layout>
</template>
<script>
import { usePortalesStore } from "../../stores/portales";
import { formatDate } from "../../helpers/formatearFecha";
import ModalPortales from "../../components/ModalPortales.vue";
import ModalEliminarPortal from "src/components/ModalEliminarPortal.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  components: {
    ModalPortales,
    ModalEliminarPortal
  },
  setup() {
    const usePortal = usePortalesStore();
    const { portales } = storeToRefs(usePortal);
    const {  obtenerPortales } = usePortal;

    const modalPortal = ref(null);
    const modalEliminar = ref(null)

    const columns = [
    {
        name: "id",
        label: "id portal",
        align: "center",
        field: "idPortal",
        sortable: true,
      },
      {
        name: "nombrePortal",
        label: "Nombre del portal",
        align: "center",
        field: "nombrePortal",
        sortable: true,
      },
      {
        name: "createdAt",
        label: "Fecha de registro",
        align: "left",
        field: (row) => formatDate(row.createdAt),
        sortable: true,
      },
      {
        name: "acciones",
        align: "left",
        field: "acciones",
      },
    ];

    const nuevoPortal = () => {
      modalPortal.value.nuevoPortal()
    };
    const editarPortal = (data) => {
      modalPortal.value.editarPortal(data)
    };

    const eliminarPortal = (data) =>{
      modalEliminar.value.abrir(data)
    }

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
      modalEliminar
    };
  },
};
</script>

<style>
</style>