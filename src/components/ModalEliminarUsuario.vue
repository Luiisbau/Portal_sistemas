<template>
  <q-dialog v-model="abrirModal">
    <q-card>
      <q-card-section class="titulo-modal text-primary">
        <div class="text-h4">Eliminar Portal</div>
      </q-card-section>

      <q-card-section class="q-ml-md">
        <div>
          Confirmas que al eliminar el portal, cortaras el acceso de todos los usuarios anclados a  "{{ usuarioObject.usuario }}".
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
import { usePermisoStore } from "src/stores/permisos";
import { usePortalesStore } from "src/stores/portales";
export default {
  setup() {
    const usePermiso = usePermisoStore()
    const { eliminarPermiso } = usePermiso

    const usePortal = usePortalesStore()
    const {obtenerPortales} = usePortal
   
    const abrirModal = ref(false)
    
    const usuarioObject = reactive({
        portal : '',
        usuario: ''
      })
    
    const abrir = (portalAnterior) => {
      usuarioObject.portal = portalAnterior.idPortal
      usuarioObject.usuario = portalAnterior.usuario.usuario
      abrirModal.value = true;
    }

    const confirmarEliminar = async() => {
      await eliminarPermiso(usuarioObject)
      obtenerPortales()
      abrirModal.value = false;
    }

    return {
      abrirModal,
      abrir,
      confirmarEliminar,    
      usuarioObject  
    };
  },
};
</script>

<style>
</style>