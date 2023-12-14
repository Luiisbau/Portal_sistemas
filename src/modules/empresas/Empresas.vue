<template>
  <div class="q-pt-xl q-px-md" >
    <div>
      <q-btn label="Agregar empresa" @click="abrirModalEmpresa"></q-btn>
      <q-btn label="Agregar Sucursal" @click="abrirModal"></q-btn>
      <q-btn label="Agregar departamento" @click="abrirModalDepartamento"></q-btn>
      <q-btn label="Agregar departamento a Sucursal" @click="abrirDepartamentoSucursal"></q-btn>

    </div>
    <q-table
      title="sucursales"
      :rows="sucursales"
      :columns="columns"
      :pagination="pagination"
      row-key="name"
    >
  </q-table>
  </div>
  <modal-sucursales ref="modalSucursal"></modal-sucursales>
  <modal-departamento ref="modalDepartamento"></modal-departamento>
  <modal-departamento-sucursal ref="modalDepartamentoSucursal"></modal-departamento-sucursal>
  <modal-empresa ref="modalEmpresa"></modal-empresa>
</template>

<script>


import { ref } from 'vue'
import { useSucursalesStore } from 'src/stores/sucursales'
import { formatDate } from "src/helpers/formatearFecha";

import ModalSucursales from 'src/components/ModalSucursales.vue'
import ModalDepartamento from 'src/components/ModalDepartamento.vue';
import ModalDepartamentoSucursal from 'src/components/ModalDepartamentoSucursal.vue';
import ModalEmpresa from 'src/components/ModalEmpresa.vue';

import { storeToRefs } from "pinia";

export default {
  components:{
    ModalSucursales,
    ModalDepartamento,
    ModalDepartamentoSucursal,
    ModalEmpresa
  },
  name:"empres_tal",
  setup() {
    const useSucursales = useSucursalesStore()
    const { sucursales  }= storeToRefs(useSucursales)

    const modalSucursal = ref(null)
    const modalDepartamento = ref(null)
    const modalDepartamentoSucursal = ref(null)
    const modalEmpresa = ref(null)

    const columns = [
      {
        name: "id",
        label: "id",
        align: "center",
        field: "idSucursal",
        sortable: true,
      },
      {
        name: "noEmpleado",
        label: "No. Empleado",
        align: "center",
        field: "nombreSucursal",
        sortable: true,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "center",
        field: "abreviacion",
        sortable: true,
      },


    ]

    const abrirModal = () =>{
      modalSucursal.value.nuevoSucursal()
    }
    const abrirModalDepartamento = () =>{
      modalDepartamento.value.nuevoDepartamento()
    }
    const abrirDepartamentoSucursal = () =>{
      modalDepartamentoSucursal.value.nuevoDepartamentoSucursal()
    }
    const abrirModalEmpresa = () =>{
      modalEmpresa.value.nuevoEmpresa()
    }

    return {
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 10
      },
      sucursales,
      columns,
      modalSucursal,
      modalDepartamento,
      modalDepartamentoSucursal,
      modalEmpresa,

      abrirDepartamentoSucursal,
      abrirModalEmpresa,
      abrirModal,
      abrirModalDepartamento
    }
  }
}
</script>
