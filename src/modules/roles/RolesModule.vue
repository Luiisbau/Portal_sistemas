<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md">
        <h2>Roles de usuarios</h2>
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
            @click="nuevoRol"
          />
        </div>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="q-pa-md">
        <q-table
          :rows="roles"
          :columns="columns"
          row-key="id">
          <template v-slot:body-cell-acciones="props">
            <q-td>
                <q-btn
                  @click="editarRol( props.row )"
                  flat
                  color="dark"
                  icon="edit"> 
                    <q-tooltip>
                      Editar Rol
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    @click="eliminarRol( props.row.idRol )"
                    flat
                    color="negative"
                    icon="delete"> 
                      <q-tooltip>
                        Eliminar Rol
                      </q-tooltip>
                  </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
      <ModalRoles ref="modalRoles"></ModalRoles>
    </q-page-container>
  </q-layout>
</template>
<script>
import { useRolStore } from '../../stores/roles'
import { formatearFecha } from '../../helpers/formatearFecha'
import ModalRoles from '../../components/ModalRoles.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'


export default {
  components: {
    ModalRoles
  },
  setup () {
    const useRol = useRolStore()
    const { roles } = storeToRefs( useRol )
    const { eliminarRol, obtenerRolEditar } = useRol

    const modalRoles = ref(null)
    const columns = [
      {
        name: 'nombreRol',
        label: 'Nombre del rol',
        align: 'left',
        field: 'nombreRol',
        sortable: true
      },
       {
        name: 'createdAt',
        label: 'Fecha de registro',
        align: 'left',
        field: row => formatearFecha( row.createdAt ),
        sortable: true
      },
      {
        name: 'acciones',
        label: 'Acciones',
        align: 'left',
        field: 'acciones',
      }
    ]
   

    const nuevoRol = () => {
      modalRoles.value.abrir( true )
    }
    const editarRol = ( rol ) => {
      // console.log(rol)
      obtenerRolEditar( rol.idRol )
      modalRoles.value.abrir( false )
    }
    return {
      columns,
      roles,
      editarRol,
      nuevoRol,
      eliminarRol,
      modalRoles
      
    }
  }
}
</script>

<style>
</style>