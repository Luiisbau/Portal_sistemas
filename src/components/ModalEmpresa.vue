<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">Empresa</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarEmpresa">
          <div class="q-my-md">
            <label>Nombre de division</label>
            <q-input
              v-model="objEmpresa.division"
            >
            </q-input>
          </div>

          <div class="q-my-md">
            <label>Razon social</label>
            <q-input
              v-model="objEmpresa.razonSocial"
            >
            </q-input>
          </div>

          <q-card-actions align="right">
            <q-btn
              icon-right="close"
              flat
              label="Cancelar"
              text-color="dark"
              color="gris"
              v-close-popup
            />
            <q-btn
              icon-right="save"
              type="submit"
              label="Guardar"
              color="primary"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive } from "vue";
import { useEmpresasStore } from "src/stores/empresas";
import { storeToRefs } from "pinia"

export default {
  setup() {

    const useEmpresas = useEmpresasStore()
    const {agregarEmpresa} = useEmpresas

    const abrirModal = ref(false)
    const tipoModal = ref('')
    const formulario = ref(null)

    const objEmpresa = reactive({
      division: '', 
      razonSocial: ''
    })

    const guardarEmpresa = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      if (tipoModal.value === 'Agregar') {
  
        agregarEmpresa(objEmpresa)
      }

      if (tipoModal.value === 'Editar') {
      }
      abrirModal.value = false;
    };

    const editarSucursal = (sucursalAnterior) => {
      tipoModal.value = 'Editar'
      abrirModal.value = true;
    };

    const nuevoEmpresa= () => {
      tipoModal.value = 'Agregar' 
      abrirModal.value = true;
    };

    return {
      abrirModal,
      guardarEmpresa,
      nuevoEmpresa,
      tipoModal,
      formulario,
      objEmpresa
    };
  },
};
</script>

<style>
</style>