<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4" v-if="nuevoRegistro">Agregar Nueva Empresa</h2>
        <h2 class="text-h4" v-else>Editar Empresa {{ empresa?.nombreEmpresa }}</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarEmpresa">
          <div class="q-my-md">
            <label>Identificador de la empresa</label>
            <q-input 
              label="Ingrese el identificador de la empresa" 
              v-model="empresaObj.idEmpresa"
              :hint="nuevoRegistro ? '' : 'Solo lectura'"
              :readonly="!nuevoRegistro"
              >
              <template v-slot:prepend>
                <q-icon name="badge"/>
              </template>
            </q-input>
          </div>
          <div class="q-my-md">
            <label>Nombre de la Empresa</label>
            <q-input 
              label="Ingrese el nombre de la empresa" 
              v-model="empresaObj.nombreEmpresa"
              >
              <template v-slot:prepend>
                <q-icon name="apartment" />
              </template>
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
import { ref, reactive } from 'vue'
import { useEmpresaStore } from '../stores/empresas'
import { storeToRefs } from 'pinia'
import { editarRegistros } from '../helpers/editarRegistros'

export default {
  setup() {
    const useEmpresa = useEmpresaStore()
    const { insertarEmpresa, editarEmpresa } = useEmpresa
    const { empresa } = storeToRefs( useEmpresa )
    // const { obtenerEmpresasComputed } = storeToRefs( useEmpresa )

    const abrirModal = ref(false)
    const nuevoRegistro = ref(true)

    let empresaObj = reactive({
        idEmpresa: '',
        nombreEmpresa:''
    })

    const guardarEmpresa = () => {

      if (nuevoRegistro.value) {

        insertarEmpresa( empresaObj )

      } else  {
        editarEmpresa( empresaObj )
      }
      abrirModal.value = false
    }

    const abrir = ( esNuevoRegistro ) => {
      const empresaNueva = { idEmpresa: '', nombreEmpresa: '' }
      
      Object.keys( empresa.value || empresaObj ).forEach( key => empresaObj[key] = editarRegistros( empresaNueva, empresa.value, esNuevoRegistro )[key] )
      
      nuevoRegistro.value = esNuevoRegistro
      abrirModal.value = true
    }

    return {
      abrirModal,
      guardarEmpresa,
      empresa,
      nuevoRegistro,
      empresaObj,
      abrir
    }
  },
}
</script>

<style>
</style>