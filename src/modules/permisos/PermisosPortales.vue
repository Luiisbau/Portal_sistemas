<template>
  <q-layout>
    <div class="q-pa-md">
      <div div class="q-pa-md">
        <h2>Permisos de Usuarios</h2>
      </div>
      <q-separator color="primary" class="q-my-md" inset />
      <div class="contenedor-tarjetas-portales">
        <q-card v-for="(item)  in portalesPermisos" :key="item">
            <q-card-section>

              <div class="titulo-tarjetas">
                <div align="center">
                <h4>{{ item.nombrePortal }}</h4>
              </div>
              </div>

                <div class="q-pa-sm">
                <q-btn size="sm" color="primary" round icon="add" @click="nuevoPermiso(item)"></q-btn>
              </div>

                <q-table
                title="Usuarios Registrados"
                :rows="item.permisosPortales"
                :columns="columns"
                 row-key="name">


                 <template v-slot:body-cell-acciones="props">
            <q-td>

              <q-btn
                @click="eliminarPermiso(props.row)"
                flat
                color="negative"
                icon="delete"
              >
                <q-tooltip> Eliminar Portal </q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-numeroEmpleado="props">
            <q-td align="center">
              <div>
                {{   props.row.usuario.numeroEmpleado }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-nombre="props">
            <q-td align="center">
              <div>
                {{   props.row.usuario.nombre }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-usuario="props">
            <q-td align="center">
              <div>
                {{   props.row.usuario.usuario }}
              </div>
            </q-td>
          </template>

                </q-table>
            </q-card-section>
        </q-card>
      </div>

    </div>
    <ModalPermisos ref="modalPermisos"></ModalPermisos>
    <ModalEliminarUsuario ref="modalEliminarPermiso"></ModalEliminarUsuario>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ModalPermisos from "../../components/ModalPermisos.vue";
import ModalEliminarUsuario from "src/components/ModalEliminarUsuario.vue";
import { usePortalesStore } from "src/stores/portales";

export default {
  components: {
    ModalPermisos,
    ModalEliminarUsuario
  },
  setup() {
    const usePortales = usePortalesStore()
    const { portalesPermisos } = storeToRefs(usePortales)

    const columns = [
    {
        name: "id",
        label: "id",
        field: 'idUsuario',
        align: "center",
        sortable: true,
      },
      {
        name: "numeroEmpleado",
        label: "No. empleado",
        align: "center",
        sortable: true,
      },
      {
        name: "nombre",
        label: "Nombre completo",
        align: "left",
        sortable: true,
      },
      {
        name: "usuario",
        label: "Usuario",
        align: "left",
        sortable: true,
      },

      {
        name: "acciones",
        field: "acciones",
        align: "left",
        sortable: true,
      },
    ];

    const modalPermisos = ref(null);
    const modalEliminarPermiso = ref(null);

    const nuevoPermiso = (data) => {
      modalPermisos.value.abrir(data);
    };

    const eliminarPermiso = (data) => {
      modalEliminarPermiso.value.abrir(data);
    };

    return {
      portalesPermisos,
      columns,
      modalPermisos,
      modalEliminarPermiso,
      nuevoPermiso,
      eliminarPermiso
    };
  },
};
</script>

<style lang="scss" scoped>

@mixin adaptar( $tamanio ) {
    @media ( min-width:$tamanio ) {
        @content;
    }
}

.contenedor-tarjetas-portales {
    display: grid;
    gap: 1rem;

    @include adaptar(765px) {
        grid-template-columns: repeat(2, 50%);
        justify-content: center;
    }
}

.titulo-tarjetas{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $primary;
    border-radius: 8px;
    h4 {
    font-size: 2rem;
    @include adaptar( 768px ) {
        font-size: 2.5rem;
        color: #fff;
      }
    }
  }



</style>
