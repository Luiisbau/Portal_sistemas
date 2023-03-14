import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useUsuarioStore = defineStore("usuarios", () => {

    // const usuarioAutenticado = ref({})
    const usuariosActivos = ref([])
    const cargando = ref(true)
  
   

      const obtenerUsuarios = async () => {
        try {
            const { data } = await api.get('/usuarios')
            usuariosActivos.value = data
            console.log( usuariosActivos.value )

        } catch ( error ) {

          console.log( error.response.msg )
          
        } finally {
            cargando.value = false
        }
      }

      return {
        usuariosActivos,
        obtenerUsuarios,
        cargando
      }
})