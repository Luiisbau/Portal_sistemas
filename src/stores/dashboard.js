import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useDashboardStore = defineStore("dashboard", () => {

    const usuariosFiltrado = ref([])
    const usuariosNulos = ref([])

    const empresasFiltrado = ref([])
    const empresas = ref([])
    const conteoEmpresas = ref([])
    const numeroTotalEmpresas = ref([])

    const portales = ref([])
    const portalesPermisos = ref([])
    const conteoPortales = ref ([])

    const usuariosActivos = ref([])
    const usuariosInactivos = ref([])
    const totalUsuarios = ref(0);

      const obtenerUsuarios = async () => {
        try {
            const { data } = await api.get('/usuarios')
            usuariosActivos.value = [...data]

            console.log(data)
            usuariosInactivos.value = data.filter(usuario => !usuario.estatus)

            totalUsuarios.value = usuariosActivos.value.length + usuariosInactivos.value.length;

            usuariosFiltrado.value = data.map(empleado => {

                return {
                  label: `${empleado.numeroEmpleado} - ${empleado.nombre} (${empleado.usuario})`,
                  value: empleado
                }
              })

              usuariosNulos.value = data.filter( e => e.idDepartamentoSucursal === null)

               } catch ( error ) {

          //console.log( error.response.msg )

        } finally {
        }
      }

       // metodos para manipular los portales
       const obtenerEmpresas = async () => {
        try {
          const { data } = await api.get('/empresas');


          const numeroTotalEmpresas = data.length;

          console.log(`Número total de empresas: ${numeroTotalEmpresas}`);

          conteoEmpresas.value = [...data];
          console.log(conteoEmpresas)

          empresasFiltrado.value = data.map(empresas => {
            return {
              label: `${empresas.idEmpresa} - ${empresas.claveEmpresa} `,
              value: empresas
            };
          });
        } catch (error) {
          // Manejo de errores
        }
      }


/*
const obtenerEmpresas = async () => {
  try {
      const { data } = await api.get('/empresas')
      conteoEmpresas.value = [...data]

      empresasFiltrado.value = data.map(empresas => {

          return {
            label: `${empresas.idEmpresa} - ${empresas.claveEmpresa} `,
            value: empresas
          }
        })

        //usuariosNulos.value = data.filter( e => e.idDepartamentoSucursal === null)

         } catch ( error ) {

    //console.log( error.response.msg )

  } finally {
  }
}
*/

//conteo de los portales
  const obtenerPortales = async () => {
    try {
      const { data } = await api.get('/portales');
      portales.value = data;


      const conteoPortales = data.length;


      console.log(`Número de portales: ${conteoPortales}`);

      return conteoPortales;
    } catch (error) {
      console.error(error);
    }
  };

      return {
        //state
        usuariosActivos,
        usuariosInactivos,
        usuariosFiltrado,
        usuariosNulos,
        empresas,
        empresasFiltrado,
        conteoEmpresas,
        numeroTotalEmpresas,
        portales,
        portalesPermisos,
        conteoPortales,
        totalUsuarios,

        //methods
        obtenerUsuarios,
        obtenerEmpresas,
        obtenerPortales
      }
    })
