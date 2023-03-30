
<template>
  <div v-if="cargando">

    <div class="q-pa-sm row justify-center items-center spinner">
      <q-spinner-tail color="primary" size="7em" display="flex" />
    </div>
  </div>

  <q-layout v-else-if="!cargando" view="hHh LpR fFf">

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




    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

      <!-- drawer content -->

      <div class="row justify-center contenedor-menu">

        <q-img src="../img/banner.jpg" id="target-img-1" style="height: 100px">

          <div class="absolute-bottom-right" style="border-top-left-radius: 5px">

            <q-avatar class="avatar">

              <!-- <img src="../img/yo.png" /> -->

              {{ inicialesUsuarios || null }}

              <!-- {{ usuarioAutenticado?.nombre }} -->

              <span style="font-weight: bold"></span>

            </q-avatar>

            {{ usuarioAutenticado?.nombre }}
            <span style="font-weight: bold"></span>

          </div>

        </q-img>

      </div>
      <NavBar></NavBar>

    </q-drawer>




    <q-page-container>

      <router-view />

    </q-page-container>

  </q-layout>
</template>







<script>
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
export default {
  components: {
    NavBar,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    
    const useUsuario = useUsuarioStore()
    const { obtenerUsuarios } = useUsuario;
    
    const useAutenticacion = useAutenticacionStore();
    const { cerrarSesion, autenticarUsuario } = useAutenticacion;
    const { usuarioAutenticado } = storeToRefs(useAutenticacion);

    const usePermiso = usePermisoStore()
    const { obtenerPermisos } = usePermiso;
    
    const useAccesos = useInformacionAccesoStore();
    const { obtenerTodosAccesos} = useAccesos
    
    const usePortal = usePortalesStore()
    const { obtenerPortales } = usePortal

    const useSucursales = useSucursalesStore()
    const { obtenerSucursales } = useSucursales

    const useEmpresas = useEmpresasStore()
    const {obtenerEmpesas} = useEmpresas
    
    const useDepartamentos = useDepartamentosStore()
    const {obtenerDepartamentos} = useDepartamentos

    const router = useRouter();

    onMounted(() => {
      obtenerPortales()
      obtenerUsuarios()
      obtenerPermisos()
      obtenerSucursales()
      obtenerEmpesas()
      obtenerDepartamentos()
      //autenticarUsuario();
      obtenerTodosAccesos()
    })

    const logout = () => {
      router.push("/");
      cerrarSesion();
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
      cargando,
      inicialesUsuarios,
      //inicialesUsuario,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
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