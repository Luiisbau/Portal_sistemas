<template>
  <div class="contenedor">
    <h2>{{nombrePortal}}</h2>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="cards-dashboard">

      <div style="display: flex; flex-direction: column; align-items: center;">
        <q-card class="card1" style="width: 115rem;">
  <q-card-section class="card-section">
    <h4>Usuarios</h4>
  </q-card-section>

  <q-separator />

  <q-card-actions class="contenido-card">
    <!-- Sección 1
    <div style="display: flex; align-items: center;">
      <img src="src/img/activos.png" alt="Mi Imagen" style="width: 5rem; height: 5rem; margin-right: 1rem;">
      <div>
        <h5>Usuarios Activos</h5>
      </div>
    </div>-->

    <!-- Sección 2 -->
    <div class="horizontal-flex" style="margin-top: 4rem; ">

      <div class="q-pa-md flex flex-center" style="margin-right: 8rem;">
        <div class="horizontal-flex" style="margin-top: 3rem; position: relative;">
      <div class="q-pa-md flex flex-center" style="position: relative;">
        <div style="text-align: center; position: absolute; top: -7rem; left: 0;">Usuarios Activos</div>
        <q-circular-progress :max="20" :min="10" :value="17" rounded size="6rem" class="q-ma-md" />
        <div class="circle-content">
          {{ usuariosActivos.length }}
        </div>
      </div>
    </div>
      </div>

    <!-- Sección 3 -->

    <div class="q-pa-md flex flex-center" style="margin-right: 8rem;">
        <div class="horizontal-flex" style="margin-top: 3rem; position: relative;">
      <div class="q-pa-md flex flex-center" style="position: relative;">
        <div style="text-align: center; position: absolute; top: -7rem; left: 0;">Total de usuarios</div>

        <q-circular-progress :max="30" :min="15" :value="30" rounded size="6rem" class="q-ma-md" />
        <div class="circle-content">
          {{ totalUsuarios }}
        </div>
      </div>
    </div>
  </div>



    <!-- Sección 4 -->
    <div class="q-pa-md flex flex-center" style="margin-right: 1rem;">
    <div class="horizontal-flex" style="margin-top: 3rem; position: relative;">
      <div class="q-pa-md flex flex-center" style="position: relative;">
        <div style="text-align: center; position: absolute; top: -7rem; left: 0;">Usuarios inactivo</div>
        <q-circular-progress :max="50" :min="25" :value="32" rounded size="6rem" class="q-ma-md" />
        <div class="circle-content">
          {{ usuariosInactivos.length }}
        </div>
      </div>
    </div>
  </div>
</div>
  </q-card-actions>
</q-card>

<div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 5rem;">
      <q-card class="card" style="width: 57rem; margin-right: 3rem;">
      <q-card-section class="card-section">
        <h4>Total de Empresas</h4>
      </q-card-section>

      <q-separator />
      <q-card-actions class="contenido-card">
    <div style="display: flex; align-items: center;">
        <img src="src/img/empresas.png" alt="Mi Imagen" style="width: 5rem; height: 5rem;">
      <div>
        <h5>Total de Empresas registradas dentro de la plataforma</h5>
      </div>
    </div>
    <div style="display: flex; align-items: center;">
      <div class="q-pa-md flex flex-center">
  <q-circular-progress indeterminate rounded size="6rem"  class="q-ma-md" />
  <div class="circle-content">
    {{ listaEmpresas.length }}
  </div>
</div>
</div>
  </q-card-actions>
</q-card>

      <q-card class="card" style="width: 57rem;">
      <q-card-section class="card-section">
        <h4>Portales registrados</h4>
      </q-card-section>

      <q-separator />
      <q-card-actions class="contenido-card">
    <div style="display: flex; align-items: center;">
        <img src="src/img/portales.png" alt="Mi Imagen" style="width: 5rem; height: 5rem;">
      <div>
        <h5>Total de portales registrados dentro de la plataforma</h5>
      </div>
    </div>
    <div style="display: flex; align-items: center;">
      <div class="q-pa-md flex flex-center">
  <q-circular-progress indeterminate rounded size="6rem"  class="q-ma-md" />
  <div class="circle-content">
    {{ portales.length }}
  </div>
</div>
</div>
  </q-card-actions>
</q-card>
</div>
    </div>
  </div>
</div>

  <div class="q-pt-xl q-px-md" >
    <q-table
      title="Ultimos accesos"
      :rows="informacionAcceso.slice(informacionAcceso.length-10)"
      :columns="columns"
      :pagination="pagination"
      row-key="name"
    />
  </div>

  <div class="q-pt-xl q-px-md" >
    <q-table
      title="Empresas por sucursal"
      :rows="informacionAcceso.slice(informacionAcceso.length-10)"
      :columns="sucursalesporempresa"
      :pagination="pagination"
      row-key="name"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useUsuarioStore } from "../../stores/usuarios";
//import { usePortalesStore } from "../../stores/portales";
import { useInformacionAccesoStore } from "src/stores/informacionAccesos";
import { formatDate } from "src/helpers/formatearFecha";
import { useEmpresasStore } from "src/stores/empresas";
import { useDashboardStore } from "../../stores/dashboard";

import ModuloUsuarios from 'src/modules/usuarios/UsuariosModule.vue'

import { storeToRefs } from "pinia";

export default {
  setup() {
    const useUsuario = useUsuarioStore();
    const { nombrePortal} = storeToRefs(useUsuario);

    //const usePortal = usePortalesStore();
    //const { portales } = storeToRefs(usePortal);

    const useAccesos = useInformacionAccesoStore();
    const { informacionAcceso} = storeToRefs(useAccesos);

    const useEmpresas = useEmpresasStore();
    const { listaEmpresas } = storeToRefs(useEmpresas);

    const useDashboard = useDashboardStore();
    const { usuariosActivos, usuariosInactivos, empresas,numeroTotalEmpresas,conteoEmpresas, portales,totalUsuarios } = storeToRefs(useDashboard);
    const { obtenerUsuarios, obtenerEmpresas, obtenerPortales } = useDashboard;


    onMounted(() => {
      nombrePortal.value = 'Modulo inicio'
    });

    const sucursalesporempresa= [
      {
        name: "Empresas",
        label: "Empresas",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.usuario,
       // field: relacionEmpresasSucursales => relacionEmpresasSucursales.empresas.claveEmpresa,
        sortable: true,
      },
      {
        name: "sucursales",
        label: "sucursales",
        align: "center",
        //field: obtenerEmpesasporsucursal=> obtenerEmpesasporsucursal.sucursales.claveSucursal,
        field: informacionAcceso => informacionAcceso.portale.nombrePortal,
        sortable: true,
      },
      ];

    const columns = [
      {
        name: "id",
        label: "id",
        align: "center",
        field: "idAcceso", //se encarga de mapear la informacion
        sortable: true,
      },
      {
        name: "noEmpleado",
        label: "No. Empleado",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.numeroEmpleado,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.usuario,
        sortable: true,
      },
      {
        name: "nombre",
        label: "Nombre",
        align: "center",
        field: informacionAcceso => informacionAcceso.usuario.nombre,
        sortable: true,
      },
      {
        name: "portal",
        label: "Portal",
        align: "center",
        field: informacionAcceso => informacionAcceso.portale.nombrePortal,
        sortable: true,
      },
      {
        name: "fechaAcceso",
        label: "Fecha de Acceso",
        align: "center",
        field: informacionAcceso => formatDate(informacionAcceso.createdAt),
        sortable: true,
      },
    ];

    return {
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      usuariosActivos,
      usuariosInactivos,
      portales,
      empresas,
      numeroTotalEmpresas,
      listaEmpresas,
      conteoEmpresas,
      informacionAcceso,
      columns,
      sucursalesporempresa,
      nombrePortal,
      totalUsuarios,

     // relacionEmpresasSucursales,

      obtenerUsuarios,
      obtenerEmpresas,
      obtenerPortales

    }
  }
}
</script>

<style scoped>
</style>
