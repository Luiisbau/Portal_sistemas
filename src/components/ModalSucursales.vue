<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">Sucursales</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarSucursal">
          <div class="q-my-md">
            <label>Nombre de la sucursal</label>
            <q-input
              v-model="objSucursal.nombreSucursal"
            >
            </q-input>
          </div>

          <div class="q-my-md">
            <label>Siglas de la sucursal</label>
            <q-input
              v-model="objSucursal.abreviacion"
            >
            </q-input>
          </div>

          <div class="q-my-md">
            <label>Selecciona la empresa</label>
            <q-select
              v-model="empresa"
              :options="listaEmpresas"
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
import { useSucursalesStore } from "src/stores/sucursales"
import { useEmpresasStore } from "src/stores/empresas";
import { storeToRefs } from "pinia"

export default {
  setup() {
    const useSucursal = useSucursalesStore()
    const { agregarSucursal } = useSucursal

    const useEmpresas = useEmpresasStore()
    const {listaEmpresas} = storeToRefs(useEmpresas) 

    const abrirModal = ref(false)
    const tipoModal = ref('')
    const formulario = ref(null)
    const empresa = ref()

    const objSucursal = reactive({
        nombreSucursal:'',
        abreviacion:'',
    })

    const guardarSucursal = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      if (tipoModal.value === 'Agregar') {
       
        const sucursal = {
          ...objSucursal,
          idEmpresa: empresa.value.data.idEmpresa
        }

        agregarSucursal(sucursal)
      }

      if (tipoModal.value === 'Editar') {
      }
      abrirModal.value = false;
    };

    const editarSucursal = (sucursalAnterior) => {
      tipoModal.value = 'Editar'
      abrirModal.value = true;
    };

    const nuevoSucursal= () => {
      tipoModal.value = 'Agregar' 
      abrirModal.value = true;
    };

    return {
      abrirModal,
      guardarSucursal,
      nuevoSucursal,
      tipoModal,
      formulario,
      objSucursal,
      listaEmpresas,
      empresa
    };
  },
};
</script>

<style>
</style>