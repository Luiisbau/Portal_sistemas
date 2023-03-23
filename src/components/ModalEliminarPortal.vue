<template>
  <q-dialog v-model="abrirModal">
    <q-card>
      <q-card-section class="titulo-modal text-primary">
        <div class="text-h4">Eliminar Portal</div>
      </q-card-section>

      <q-card-section class="q-ml-md">
        <div>
          Confirmas que al eliminar el portal, cortaras el acceso de todos los usuarios anclados a  "{{ portal.nombrePortal }}".
        </div>

      </q-card-section>

      <q-card-actions class="q-mb-md q-mr-md" align="center">
        <q-btn class="text-primary" no-caps label="Cancelar" v-close-popup />
        <q-btn type="submit" no-caps label="Confirmar" color="primary" @click="confirmarEliminar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import { usePortalesStore } from "src/stores/portales";

export default {
  setup() {
    const usePortales = usePortalesStore()
    const { eliminarPortal } = usePortales
   
    const abrirModal = ref(false)
    const portal = ref(null)
    
    const abrir = (portalAnterior) => {
      abrirModal.value = true;
      portal.value = portalAnterior
    }

    const confirmarEliminar = () => {
      eliminarPortal(portal.value)
      abrirModal.value = false;
    }

    return {
      abrirModal,
      abrir,
      confirmarEliminar,
      portal
      
    };
  },
};
</script>

<style>
</style>