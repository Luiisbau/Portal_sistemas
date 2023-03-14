<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4" v-if="nuevoRegistro">Agregar Nuevo Rol</h2>
        <h2 class="text-h4" v-else>Editar Rol</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarRol">
          <div class="q-my-md">
            <label>Nombre del Rol</label>
            <q-input
              label="Ingrese el nombre del rol"
              v-model="rolObj.nombreRol"
              :rules="[(val) => campoObligatorio(val)]"
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
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRolStore } from "../stores/roles";
import { editarRegistros } from "../helpers/editarRegistros";
import { campoObligatorio } from "../helpers/validaciones";

export default {
  setup() {
    const useRol = useRolStore();
    const { insertarRol, editarRol } = useRol;
    const { rol } = storeToRefs(useRol);

    const abrirModal = ref(false);
    const nuevoRegistro = ref(true);

    let rolObj = reactive({
      idRol: "",
      nombreRol: "",
    });

    const guardarRol = () => {
      if (nuevoRegistro.value) {
        insertarRol(rolObj);
      } else {
        editarRol(rolObj);
      }
      abrirModal.value = false;
    };

    const abrir = (esNuevoRegistro) => {
      const rolNuevo = { nombreRol: "" };
      // rol.value es para cuando se quiera editar y rolObj para cuando se quiera agregar un nuevo objeto
      // debemos iterar por cada propiedad (key) para que se sobreescriban o se agregue un nuevo registro
      Object.keys(rol.value || rolObj).forEach(
        (key) =>
          (rolObj[key] = editarRegistros(rolNuevo, rol.value, esNuevoRegistro)[
            key
          ])
      );

      nuevoRegistro.value = esNuevoRegistro;
      abrirModal.value = true;
    };

    return {
      abrir,
      abrirModal,
      rol,
      rolObj,
      guardarRol,
      insertarRol,
      nuevoRegistro,
      campoObligatorio,
    };
  },
};
</script>

<style>
</style>