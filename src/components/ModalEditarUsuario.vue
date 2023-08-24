<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">EditarUsuario</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarUsuario">
          <div class="q-my-md">
            <label>Nombre usuario</label>
            <q-input
              label="Ingrese el nombre del portal"
              v-model="datosObjet.usuario"
            >
            </q-input>
            
          </div>

          <div class="q-my-md">
            <label>correo</label>
            <q-input
              label="Ingrese el nombre del portal"
              v-model="datosObjet.correo"
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
import { useUsuarioStore } from "src/stores/usuarios";
import { usePortalesStore } from "src/stores/portales";

export default {
  setup() {
    const useUsuario = useUsuarioStore();
    const { editarUsuarios } = useUsuario;

    const usePortal = usePortalesStore();
    const { obtenerPortales } = usePortal;

    const abrirModal = ref(false)
    const tipoModal = ref("")
    const formulario = ref(null)

    const datosObjet =  reactive({
        numero_empleado: '',
        usuario: '',
        correo: ''
    })

    const guardarUsuario = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      await editarUsuarios(datosObjet)
      obtenerPortales()
      abrirModal.value = false;
    }

    const edtiarUsuario = (usuarioAnterior) => {
      tipoModal.value = 'Editar'
      abrirModal.value = true;
      datosObjet.numero_empleado = usuarioAnterior.numero_empleado
      datosObjet.usuario = usuarioAnterior.usuario
      datosObjet.correo = usuarioAnterior.correo

    }

    return {
      abrirModal,
      guardarUsuario,
      tipoModal,
      formulario,
      edtiarUsuario,
      datosObjet
    };
  },
};
</script>

<style>
</style>