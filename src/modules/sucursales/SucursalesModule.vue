<template>
  <q-layout>
    <div class="q-pa-md">
      <div div class="q-pa-md">
        <h2>Sucursales</h2>
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
            @click="nuevaSucursal"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
        <!-- :loading="cargando" -->
      <q-table
        color="primary"
        :rows="sucursales"
        :columns="columns"
        :filter="buscar"
      >
        <template v-slot:top>
          <div class="fit row q-gutter-sm">
            <div class="col">
              <q-select
                outlined
                dense
                :options="filtrosSucursales"
                v-model="filtroSeleccionado"
                map-options
                option-value="name"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                dense
                debounce="300"
                v-model="buscar"
                placeholder="Buscar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>
        <template v-slot:body-cell-acciones="props">
          <q-td>
            <q-btn
                @click="editarSucursal( props.row )"
                flat 
                color="dark" 
                icon="edit">
              <q-tooltip> Editar Sucursal </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <ModalSucursales ref="modalSucursal"></ModalSucursales>
    </div>
  </q-layout>
</template>


<script>
import ModalSucursales from '../../components/ModalSucursales.vue'
import { ref } from 'vue'
import { useSucursalesStore } from '../../stores/sucursales'
import { storeToRefs }  from 'pinia'
import { formatearFecha } from '../../helpers/formatearFecha'
export default {
    components:{
        ModalSucursales
    },
    
    setup (){
        const useSucursal = useSucursalesStore()
        const { sucursales } = storeToRefs( useSucursal )
        const { obtenerSucursalEditar } = useSucursal
        const columns = [

            { name: 'nombreSucursal', label: 'Nombre de la sucursal', field: 'nombreSucursal', align: 'left', sortable: true },
            { name: 'nombreEmpresa', label: 'Empresa', field: 'nombreEmpresa', align: 'left', sortable: true },
            { name: 'createdAt', label: 'Fecha de Registro', field: row => formatearFecha( row.createdAt ), align: 'left', sortable: true },
            { name: 'acciones', label: 'Acciones', field: 'acciones', align: 'left', sortable: true },
        ]
        const filtrosSucursales = [
            'Solo los activos',
            'Por Empresas'
        ]
        const modalSucursal = ref(null)
        
        const nuevaSucursal = () => {
            modalSucursal.value.abrir( true )
        }
        const editarSucursal = ( sucursal ) => {
            obtenerSucursalEditar( sucursal )
            modalSucursal.value.abrir( false )
        }
        return {
            columns,
            filtrosSucursales,
            nuevaSucursal,
            editarSucursal,
            modalSucursal,
            sucursales,
            filtroSeleccionado: ref('Solo los activos'),
            buscar: ref('')
        }
    }

}
</script>

<style>
</style>