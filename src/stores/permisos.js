import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const usePermisoStore = defineStore("permisos", () => {

    const permisos = ref([])
    const permiso = ref(null)

    const obtenerPermisos = async () => {
        try {
            const { data } = await api.get('/permisos')
            permisos.value = [ ...data ]
        } catch (error) {
            console.log( error )
        }
    }

    const insertarPermiso = async ( permiso ) => {
        try {
            const { data } = await api.post('/permisos', permiso)
            permisos.value = [ data, ...permisos.value ]
            
            console.log( data )
        } catch (error) {
            
            console.log( error )
        }
    }


    return {
        permisos,
        insertarPermiso,
        obtenerPermisos
    }
})