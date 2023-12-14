  <template>
    <q-dialog v-model="abrirModal">
      <q-card class="full-width">
        <q-card-section class="bg-primary text-white row items-center q-pb-none">
          <h2 class="text-h6">Usuarios</h2>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="guardarUsuario">
            <div class="q-my-md">
              <label>Numero de empleado</label>
              <q-input
                label="Ingrese el nombre del portal"
                v-model="datosObjet.numeroEmpleado"
                :rules="[
                  (val) =>
                    (val && val !== null) || 'Por favor ingrese el numero de Empleado',
                ]"
              >
              </q-input>
            </div>

            <div class="q-my-md">
              <label>Nombre usuario</label>
              <q-input
                label="Ingrese el nombre del portal"
                v-model="datosObjet.usuario"
                :rules="[
                  (val) =>
                    (val && val !== null) || 'Por favor ingrese el nombre de Usuario',
                ]"
              >
              </q-input>
            </div>

            <div class="q-my-md">
              <label>Nombre completo</label>
              <q-input
                label="Ingrese el nombre del portal"
                v-model="datosObjet.nombre"
                :rules="[
                  (val) =>
                    (val && val !== null) || 'Por favor ingrese el numero completo del empleado',
                ]"
              >
              </q-input>
            </div>

            <div class="q-my-md">
              <label>correo</label>
              <q-input
                label="Ingrese el nombre del portal"
                v-model="datosObjet.correo"
                 :rules="[
                  (val) =>
                    (val && val !== null) || 'Por favor ingrese correo',
                ]"
              >
              </q-input>
            </div>

            <div class="q-my-md">
              <label>centro de trabajo</label>
              <q-input
                label="Ingrese el nombre del portal"
                v-model="datosObjet.siglasCentroTrabajo"
                :rules="[
                  (val) =>
                    (val && val !== null) || 'Por favor ingrese el centro de trabajo',
                ]"
              >
              </q-input>
            </div>

          </q-form>
        </q-card-section>

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
      const nombreUsuario = ref("")
      const formulario = ref(null)



    const datosObjet =  reactive({
          numeroEmpleado: '',
          usuario: '',
          correo: '',
          nombre: '',
          siglasCentroTrabajo: ''
      })

      const guardarUsuario = async() => {
      /* if (!await formulario.value.validate()) {
          return formulario.value.validate()
        }   */

        await editarUsuarios(datosObjet)
        obtenerPortales()
        abrirModal.value = false;


      };

      const editarUsuario = (usuarioAnterior) => {
        tipoModal.value = 'Editar'
        abrirModal.value = true;
        console.log(usuarioAnterior)

      datosObjet.numeroEmpleado = usuarioAnterior.numeroEmpleado
      datosObjet.usuario = usuarioAnterior.usuario
      datosObjet.correo = usuarioAnterior.correo
      datosObjet.nombre = usuarioAnterior.nombre
        datosObjet.siglasCentroTrabajo = usuarioAnterior.siglasCentroTrabajo
      }



      return {
        abrirModal,
        nombreUsuario,
        datosObjet,
        tipoModal,
        formulario,

        editarUsuario,
        guardarUsuario
      };
    },
  };
  </script>

  <style>
  </style>
