import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useUsuarioStore = defineStore("usuarios", () => {

    const usuariosFiltrado = ref([])
    const usuariosActivos = ref([])
    const cargando = ref(true)

      const obtenerUsuarios = async () => {
        try {
            const { data } = await api.get('/usuarios')
            usuariosActivos.value = [...data]

            usuariosFiltrado.value = data.map(empleado => {
                return {
                  label: `${empleado.numero_empleado} - ${empleado.nombre} (${empleado.usuario})`,
                  value: empleado
                }
              })

        } catch ( error ) {

          //console.log( error.response.msg )
          
        } finally {
            cargando.value = false
        }
      }

      const editarUsuarios = async (usuario) => {
        try {
            await api.put('/usuarios', usuario )
            const posicion =  usuariosActivos.value.findIndex(element => element.idUsuario === usuario.idUsuario)
            usuariosActivos.value[posicion].usuario = usuario.usuario;
            usuariosActivos.value[posicion].correo = usuario.correo; 

        } catch ( error ) {
          //console.log( error.response.msg )
        } finally {

        }
      }

      return {
        usuariosActivos,
        obtenerUsuarios,
        editarUsuarios,
        cargando,
        usuariosFiltrado
      }
})