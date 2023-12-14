<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h6">Portales</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarPortal">
          <div class="q-my-md">
            <label>Nombre del Portal</label>
            <q-input
              label="Ingrese el nombre del portal"
              v-model="nombrePortal"
            >
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
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
import { ref } from "vue";
import { usePortalesStore } from "../stores/portales";

export default {
  setup() {
    const usePortal = usePortalesStore();
    const { insertarPortal, editarNombrePortal } = usePortal;

    const abrirModal = ref(false);
    const nombrePortal = ref("");
    const portal = ref(null);
    const tipoModal = ref("");
    const formulario = ref(null)

    const guardarPortal = async() => {
     /* if (!await formulario.value.validate()) {
        return formulario.value.validate()
      }*/

      if (tipoModal.value === 'Agregar') {
       await insertarPortal(nombrePortal.value);
      }

      if (tipoModal.value === 'Editar') {
        await editarNombrePortal({nombre: nombrePortal.value, portal: portal.value})
      }

      nombrePortal.value = "";
      abrirModal.value = false;
    };

    const editarPortal = (nombreAnterior) => {
      tipoModal.value = 'Editar'
      nombrePortal.value = nombreAnterior.nombrePortal
      portal.value = nombreAnterior
      abrirModal.value = true;
    };

    const nuevoPortal = () => {
      tipoModal.value = 'Agregar'
      nombrePortal.value = ''
      abrirModal.value = true;
    };

    return {
      abrirModal,
      nombrePortal,
      guardarPortal,
      insertarPortal,
      portal,
      nuevoPortal,
      tipoModal,
      formulario,
      editarPortal
    };
  },
};
</script>

<style>
</style>
