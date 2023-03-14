<template>
  <q-dialog v-model="abrirModal">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white row items-center q-pb-none">
        <h2 class="text-h4" v-if="nuevoRegistro">Crear Nuevo Permiso</h2>
        <h2 class="text-h4" v-else>Editar Permiso</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="guardarPermiso">
          <div class="q-my-md">
            <label>Nombre del Usuario</label>
            <q-select
              v-model="permisoObj.nombre"
              :options="optionsUsuarios"
              option-label="nombre"
              use-input
              @filter="filterFn"
              label="Seleccione un usuario"
              :rules="[
                (val) =>
                  (val && val !== null) || 'Por favor seleccione un usuario',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person_add" />
              </template>
            </q-select>
          </div>

          <div class="q-my-md">
            <label>Nombre de la empresa</label>
            <q-select
              v-model="permisoObj.empresaIdEmpresa"
              :options="options"
              option-label="nombreEmpresa"
              use-input
              @filter="filterFn"
              label="Seleccione una empresa"
              :rules="[
                (val) =>
                  (val && val !== null) || 'Por favor seleccione una empresa',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="apartment" />
              </template>
            </q-select>
          </div>

          <div class="q-my-md">
            <label>Nombre de la sucursal</label>
            <q-select
              v-model="permisoObj.sucursaleIdSucursal"
              :options="optionsSucursales"
              option-label="nombreSucursal"
              use-input
              @filter="filterFn"
              label="Seleccione una sucursal"
              :rules="[
                (val) =>
                  (val && val !== null) || 'Por favor seleccione una sucursal',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="corporate_fare" />
              </template>
            </q-select>
          </div>

          <div class="q-my-md">
            <label>Nombre del rol</label>
            <q-select
              v-model="permisoObj.roleId"
              :options="optionsRoles"
              option-label="nombreRol"
              use-input
              @filter="filterFn"
              label="Seleccione un rol"
              :rules="[
                (val) => (val && val !== null) || 'Por favor seleccione un rol',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
              </template>
            </q-select>
          </div>
          <!-- 
          <div class="q-my-md">
            <label>Nombre del portal</label>
            <q-select
              v-model="permisoObj.portaleId"
              :options="optionesPortales"
              option-label="nombre"
              use-input
              @filter="filterFn"
              label="Seleccione un portal"
              :rules="[
                (val) =>
                  (val && val !== null) || 'Por favor seleccione un portal',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="language" />
              </template>
            </q-select>
          </div> -->
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
import { reactive, ref } from "vue";
import { useEmpresaStore } from "../stores/empresas";
import { useSucursalesStore } from "../stores/sucursales";
import { useRolStore } from "../stores/roles";
import { usePortalesStore } from "../stores/portales";
import { useUsuarioStore } from "../stores/usuarios";
import { usePermisoStore } from "../stores/permisos";
import { storeToRefs } from "pinia";
import { buscarRegistro } from "../helpers/buscarRegistro";

export default {
  setup() {
    const nuevoRegistro = ref(true);
    const abrirModal = ref(false);

    const useEmpresa = useEmpresaStore();
    const { empresas } = storeToRefs(useEmpresa);

    const useSucursal = useSucursalesStore();
    const { sucursales } = storeToRefs(useSucursal);

    const useRol = useRolStore();
    const { roles } = storeToRefs(useRol);

    const usePortal = usePortalesStore();
    const { portales } = storeToRefs(usePortal);

    const useUsuario = useUsuarioStore();
    const { usuariosActivos } = storeToRefs(useUsuario);

    const usePermiso = usePermisoStore();
    const { insertarPermiso } = usePermiso;

    const options = ref(empresas.value);
    const optionsSucursales = ref(sucursales.value);
    const optionsRoles = ref(roles.value);
    const optionesPortales = ref(portales.value);
    const optionsUsuarios = ref(usuariosActivos.value);

    let permisoObj = reactive({
      nombrePermiso: "",
      usuario: "",
      nombreRol: "",
      nombreEmpresa: "",
      nombreSucursal: "",
      idSucursal: "",
      idEmpresa: "",
      idRol: "",
    });

    const guardarPermiso = () => {
      const permisoNuevo = {
        nombrePermiso: permisoObj.nombre.nombre,
        usuarioPermiso: permisoObj.nombre.usuario,
        nombreRol: permisoObj.roleId.nombreRol,
        nombreEmpresa: permisoObj.empresaIdEmpresa.nombreEmpresa,
        nombreSucursal: permisoObj.sucursaleIdSucursal.nombreSucursal,
        idEmpresa: permisoObj.empresaIdEmpresa.idEmpresa,
        idSucursal: permisoObj.sucursaleIdSucursal.idSucursal,
        idUsuario: permisoObj.nombre.id,
        activo: true,
      };

      insertarPermiso(permisoNuevo);
    };

    const abrir = (esNuevoRegistro) => {
      // const permisoNuevo = { nombre: '', usuario: '', nombre_rol: '', nombre_empresa: '', nombre_sucursal: '', nombre_portal: '', sucursaleIdSucursal: '', empresaIdEmpresa: '', roleId: '', portaleId: '' }

      // Object.keys( permisoObj ).forEach( key =>  permisoObj[key])
      abrirModal.value = true;
    };

    //TODO: VOLVER UN HELPER
    const filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          options.value = empresas.value;
          optionsSucursales.value = sucursales.value;
          optionsRoles.value = roles.value;
          optionesPortales.value = portales.value;
          optionsUsuarios.value = usuariosActivos.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = empresas.value.filter(
          (v) => v.nombreEmpresa.toLowerCase().indexOf(needle) > -1
        );
        optionsSucursales.value = sucursales.value.filter(
          (v) => v.nombreSucursal.toLowerCase().indexOf(needle) > -1
        );
        optionsRoles.value = roles.value.filter(
          (v) => v.nombreRol.toLowerCase().indexOf(needle) > -1
        );
        optionesPortales.value = portales.value.filter(
          (v) => v.nombre.toLowerCase().indexOf(needle) > -1
        );
        optionsUsuarios.value = usuariosActivos.value.filter(
          //  v.nombre.toLowerCase().indexOf(needle) > -1
          (v) => console.log(v)
        );
      });
    };

    return {
      abrirModal,
      nuevoRegistro,
      permisoObj,
      guardarPermiso,
      options,
      abrir,
      empresas,
      sucursales,
      roles,
      optionsRoles,
      optionsSucursales,
      optionesPortales,
      optionsUsuarios,
      portales,
      filterFn,
      buscarRegistro,
    };
  },
};
</script>

<style>
</style>