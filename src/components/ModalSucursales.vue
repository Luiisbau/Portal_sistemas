<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4" v-if="nuevoRegistro">Agregar Nueva Sucursal</h2>
        <h2 class="text-h4" v-else>Editar Rol</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarSucursal">
          <div class="q-my-md">
            <label>Identificador Sucursal</label>
            <q-input 
                label="Ingresa el identificador de la sucursal"
                v-model="sucursalObj.idSucursal"
                :rules="[val => campoObligatorio( val )]"
                >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div class="q-my-md">
            <label>Nombre de la sucursal</label>
            <q-input 
                label="Ingresa el nombre de la sucursal"
                v-model="sucursalObj.nombreSucursal"
                :rules="[val => campoObligatorio( val )]"
                >
              <template v-slot:prepend>
                <q-icon name="corporate_fare" />
              </template>
            </q-input>
          </div>
          <div class="q-my-md">
            <label>Nombre de la empresa</label>
            <q-select
                v-model="sucursalObj.idEmpresa"
                :options="options"
                option-label="nombreEmpresa"
                use-input
                @filter="filterFn"
                label="Seleccione una empresa"
                :rules="[val => val && val !== null || 'Por favor seleccione una empresa']"
            >
              <template v-slot:prepend>
                <q-icon name="apartment" />
              </template>
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
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
// import { useRolStore } from '../stores/roles'
import { useEmpresaStore } from '../stores/empresas'
import { useSucursalesStore } from '../stores/sucursales'
import { editarRegistros } from '../helpers/editarRegistros'
import { campoObligatorio } from '../helpers/validaciones'

export default {

  setup() {
    const useEmpresa = useEmpresaStore()
    const useSucursal = useSucursalesStore()
    const { empresas } = storeToRefs( useEmpresa )
    const { sucursal } = storeToRefs( useSucursal )

    const { insertarSucursal, editarSucursal } = useSucursal
    // const useRol = useRolStore()
    // const { insertarRol, editarRol } = useRol
    // const { rol } = storeToRefs( useRol )

    const abrirModal = ref(false)
    const nuevoRegistro = ref(true)
    const options = ref(empresas.value)


    let sucursalObj = reactive({
        idSucursal: '',
        nombreSucursal: '',
        idEmpresa: '',
        nombreEmpresa: ''
    })


    const guardarSucursal = () => {
      if (nuevoRegistro.value) {
        insertarSucursal( sucursalObj )
      } else {
          editarSucursal( sucursalObj )
      }
        abrirModal.value = false

    }
    
    const abrir  = ( esNuevoRegistro ) => {
      
      const sucursalNueva = {  idSucursal: '', nombreSucursal: '', idEmpresa: '', nombreEmpresa: '' }
        
      Object.keys( sucursal.value || sucursalObj ).forEach( key => sucursalObj[key] = editarRegistros( sucursalNueva, sucursal.value, esNuevoRegistro)[key] ) 
      
      nuevoRegistro.value = esNuevoRegistro
      abrirModal.value = true        
    }

      const  filterFn = ( val, update ) => {
        if (val === '') {
          update(() => {
            options.value = empresas.value
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = empresas.value.filter(v => v.nombreEmpresa.toLowerCase().indexOf(needle) > -1)
        })
      }

    return {
      abrir,
      abrirModal,
      sucursal,
      sucursalObj,
      guardarSucursal,
      nuevoRegistro,
      campoObligatorio,
      insertarSucursal,
      filterFn,
      options
    }
  },
}
</script>

<style>
</style>