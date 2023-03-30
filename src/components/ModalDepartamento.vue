<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">Departamento</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarDepartamento">
          <div class="q-my-md">
            <label>Nombre de la sucursal</label>
            <q-input
              v-model="departamento"
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
import { useDepartamentosStore } from "src/stores/departamento";
export default {
  setup() {

    const useDepartamentos = useDepartamentosStore()
    const {agregarDepartamento} = useDepartamentos

    const abrirModal = ref(false)
    const tipoModal = ref('')
    const formulario = ref(null)
    const departamento = ref('')

    const guardarDepartamento = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      if (tipoModal.value === 'Agregar') {
  
        agregarDepartamento({nombreDepartamento: departamento.value })
      }

      if (tipoModal.value === 'Editar') {
      }
      abrirModal.value = false;
    };

    const editarSucursal = (sucursalAnterior) => {
      tipoModal.value = 'Editar'
      abrirModal.value = true;
    };

    const nuevoDepartamento = () => {
      tipoModal.value = 'Agregar' 
      abrirModal.value = true;
    };

    return {
      abrirModal,
      guardarDepartamento,
      nuevoDepartamento,
      tipoModal,
      formulario,
      departamento,
  
    };
  },
};
</script>

<style>
</style>