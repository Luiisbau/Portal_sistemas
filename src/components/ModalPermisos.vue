<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4" >Crear Nuevo Permiso</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarPermiso">
          <div class="q-my-md">
            <label>Nombre del Usuario</label>
            <q-select
              use-input
              v-model="usuarioSeleccionado"
              :options="optionsUsuarios"
              @filter="parametrosFiltradosEmpleados"
              clearable
              behavior="menu"
              label="Seleccione un usuario"
              :rules="[
                (val) =>
                  (val && val !== null) || 'Por favor seleccione un usuario',
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No se encontraron resultados
                  </q-item-section>
                </q-item>
              </template>
             
              <template v-slot:prepend>
                <q-icon name="person_add" />
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
import { ref } from "vue";
import { usePortalesStore } from "../stores/portales";
import { useUsuarioStore } from "../stores/usuarios";
import { usePermisoStore } from "../stores/permisos";
import { filtradoBusquedaObj } from "src/helpers/filtradoBusquedaObj";
import { storeToRefs } from "pinia";

export default {
  setup() {

    const usePortal = usePortalesStore();
    const {obtenerPortales} = usePortal

    const useUsuario = useUsuarioStore();
    const { usuariosActivos, usuariosFiltrado } = storeToRefs(useUsuario);

    const usePermiso = usePermisoStore();
    const { insertarPermiso } = usePermiso;

    const optionsUsuarios = ref(usuariosFiltrado.value)

    const portal = ref(null)
    const abrirModal = ref(false);
    const usuarioSeleccionado = ref('')

    const guardarPermiso = async() => {

      if(usuarioSeleccionado.value){
       const {value} = usuarioSeleccionado.value
       await insertarPermiso({usuario: value.usuario, portal: portal.value.idPortal})
        obtenerPortales()
       abrirModal.value = false;
      }
    };


    const abrir = (data) => {
      portal.value = data
      usuarioSeleccionado.value = ''
      abrirModal.value = true;
    }
    const parametrosFiltradosEmpleados = (val, update) => {
      filtradoBusquedaObj(val, update, usuariosFiltrado.value, optionsUsuarios)
    }

    return {
      abrirModal,
      abrir,
      usuarioSeleccionado,
      portal,
      guardarPermiso,
      optionsUsuarios,
      usuariosActivos,
      parametrosFiltradosEmpleados
    };
  },
};
</script>

<style>
</style>