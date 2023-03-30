<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">Departamento</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarDepartamentoSucursal">
          
          <div class="q-my-md">
            <label>Selecciona el la suursal</label>
            <q-select
              v-model="sucursal"
              :options="listaSucursales"
            >
            </q-select>
          </div>

          <div class="q-my-md">
            <label>Selecciona el departamento </label>
            <q-select
              v-model="departamento"
              :options="listaDepartamentos"
            >
            </q-select>
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
import { useSucursalesStore } from "src/stores/sucursales";
import { useDepartamentosStore } from "src/stores/departamento";
import {useDepartamentoSucursalStore} from 'src/stores/departamentoSucursal'
import { storeToRefs } from "pinia"
export default {
  setup() {

    const useDepartamentos = useDepartamentosStore()
    const {listaDepartamentos} = storeToRefs(useDepartamentos)

    const useSucursales = useSucursalesStore()
    const {listaSucursales}= storeToRefs(useSucursales)

    const useDepartamentoSucursal = useDepartamentoSucursalStore()
    const {agregarDepartamentoSucursal} = useDepartamentoSucursal

    const abrirModal = ref(false)
    const tipoModal = ref('')
    const formulario = ref(null)

    const departamento = ref('')
    const sucursal = ref('')

    const guardarDepartamentoSucursal = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      if (tipoModal.value === 'Agregar') {
        const objDeparSuc = {
        idSucursal: sucursal.value.data.idSucursal,
        idDepartamento: departamento.value.data.idDepartamento  
        }

        agregarDepartamentoSucursal(objDeparSuc)
      }

      if (tipoModal.value === 'Editar') {
      }
      abrirModal.value = false;
    };

    const editarSucursal = (sucursalAnterior) => {
      tipoModal.value = 'Editar'
      abrirModal.value = true;
    };

    const nuevoDepartamentoSucursal= () => {
      tipoModal.value = 'Agregar' 
      abrirModal.value = true;
    };

    return {
      abrirModal,
      guardarDepartamentoSucursal,
      nuevoDepartamentoSucursal,
      tipoModal,
      formulario,
      departamento,
      sucursal,
      listaDepartamentos,
      listaSucursales
    };
  },
};
</script>

<style>
</style>