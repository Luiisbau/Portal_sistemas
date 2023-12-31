import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useUsuarioStore = defineStore("usuarios", () => {

    const usuariosFiltrado = ref([])
    const usuariosNulos = ref([])
    const nombrePortal = ref('')

    const usuariosActivos = ref([])
    const totalUsuarios = ref([])
    //const usuariosInactivos = ref([])

        const obtenerUsuarios = async () => {
        try {
            const { data } = await api.get('/usuarios')
            usuariosActivos.value = [...data]

      //     console.log(data)
      //      usuariosInactivos.value = data.filter(usuario => !usuario.estatus)

            usuariosFiltrado.value = data.map(empleado => {

                return {
                  label: `${empleado.numeroEmpleado} - ${empleado.nombre}  (${empleado.usuario}) ` ,
                  value: empleado
                }
              })

              usuariosNulos.value = data.filter( e => e.idDepartamentoSucursal === null)

               } catch ( error ) {

          //console.log( error.response.msg )

        } finally {
        }
      }

      const editarUsuarios = async (usuario) => {
        try {
            await api.put('/usuarios', usuario )
            const posicion =  usuariosActivos.value.findIndex(element => element.idUsuario === usuario.idUsuario)
            usuariosActivos.value[posicion].usuario = usuario.usuario;
            usuariosActivos.value[posicion].correo = usuario.correo;

            usuariosFiltrado.value = usuariosActivos.value.map(empleado => {
              return {
                label: `${empleado.numeroEmpleado} - ${empleado.nombre}   (${empleado.usuario})`,
                value: empleado
              }
            })

        } catch ( error ) {
          //console.log( error.response.msg )
        } finally {

        }
      }

      return {
        //state
        usuariosActivos,
       // usuariosInactivos,
        usuariosFiltrado,
        usuariosNulos,
        nombrePortal,
        totalUsuarios,

        //methods
        obtenerUsuarios,
        editarUsuarios
      }
})
