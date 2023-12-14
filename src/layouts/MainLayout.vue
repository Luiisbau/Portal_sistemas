
<template>
 <!-- <div v-if="cargando">

    <div class="q-pa-sm row justify-center items-center spinner">
      <q-spinner-tail color="primary" size="7em" display="flex" />
    </div>
  </div>
-->
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white row">

      <q-toolbar>

        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />




        <q-toolbar-title>

          <q-avatar class="logo-inicio">

            <img src="../img/logog.png" />

          </q-avatar>

          Portal de Sistemas

        </q-toolbar-title>

        <q-btn flat @click="logout"> Cerrar sesión</q-btn>

      </q-toolbar>

      <!-- <q-btn>Cerrar Sesión</q-btn> -->

    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="270">
      <!-- drawer content -->
      <div class="contenedor-perfil">
        <div style="background-color: rgba(0, 0, 0, 0.5);" class="q-px-md q-py-sm">
            <div style="display: flex; justify-content: center;">
              <q-avatar size="7rem">
                <q-img
                  :src="calcularURLFoto(usuarioAutenticado?.numero_empleado)"
                  spinner-color="white"/>
              </q-avatar>
            </div>
            <div style="display: flex; justify-content: center; " >
              {{ usuarioAutenticado?.nombre }}
            </div>
        </div>
      </div>
      <NavBar></NavBar>
    </q-drawer>

    <q-page-container>

      <router-view />

    </q-page-container>

  </q-layout>
</template>


<script>
import { calcularURLFoto } from "src/helpers/formatearString";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import NavBar from "../components/NavBar.vue";
import { useUsuarioStore } from "../stores/usuarios";
import { usePortalesStore } from "../stores/portales";
import { usePermisoStore } from "../stores/permisos";
import { useAutenticacionStore } from "../stores/autenticaciones";
import { useInformacionAccesoStore } from "src/stores/informacionAccesos";
import { useSucursalesStore } from 'src/stores/sucursales'
import { useEmpresasStore } from "src/stores/empresas";
import { useDepartamentosStore } from "src/stores/departamento";
import { useDashboardStore } from "src/stores/dashboard";
export default {
  components: {
    NavBar,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    const useAutenticacion = useAutenticacionStore();
    const { cerrarSesion } = useAutenticacion;
    const { usuarioAutenticado } = storeToRefs(useAutenticacion);

    const usePermiso = usePermisoStore()
    const { obtenerPermisos } = usePermiso;

    const useAccesos = useInformacionAccesoStore();
    const { obtenerTodosAccesos} = useAccesos

    const useSucursales = useSucursalesStore()
    const { obtenerSucursales } = useSucursales

    const useDepartamentos = useDepartamentosStore()
    const {obtenerDepartamentos} = useDepartamentos

    const useDashboard = useDashboardStore();
    const { obtenerUsuarios, obtenerPortales } = useDashboard;

    const useEmpresas = useEmpresasStore();
    const { obtenerEmpresas } = useEmpresas;

    const router = useRouter();

    onMounted(() => {
      obtenerPermisos()
      obtenerSucursales()
      obtenerDepartamentos()
      obtenerTodosAccesos()
      obtenerUsuarios();
      obtenerEmpresas();
      obtenerPortales();
    })

    const logout = () => {
      router.push("/");
      cerrarSesion()
    };

    const inicialesUsuarios = computed(() => {
      const nombreArray = usuarioAutenticado?.value?.nombre.split(" ");
      if (!nombreArray) return;
      const iniciales = `${nombreArray[0]?.charAt(0)}${nombreArray[1]?.charAt(
        0
      )}`;
      return iniciales;
    });

    return {
      leftDrawerOpen,
      usuarioAutenticado,
      logout,
      inicialesUsuarios,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      calcularURLFoto
    };
  },
};
</script>
<style scoped>
.logo-inicio {
  background-color: white;
}

.logo-inicio img {
  padding: 0.3rem;
}

.contenedor-menu {
  margin-bottom: 1rem;
}

.spinner {
  height: 100vh;
}
</style>
