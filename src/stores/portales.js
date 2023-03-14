import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const usePortalesStore = defineStore("portales", () =>  {
    // state de portales
    const portales = ref([])


    // metodos para manipular los portales
    const obtenerPortales = async () => {
        try {
            const { data } = await api.get('/portales')
            portales.value = [ ...data ]
        } catch (error) {
            
            console.log( error )
        }
    }
    const insertarPortal = async ( portal ) => {
        try {
            await api.post('/portales', { nombrePortal: portal })
            portales.value = [ { nombrePortal: portal }, ...portales.value ]
        } catch (error) {
            
            console.log( error )
        }
    }
    const eliminarPortal = async ( id ) => {
        try {
            await api.delete(`/portales/${ id }`)
            portales.value = portales.value.filter( portal => portal.id !== id )
        } catch (error) {
            
            console.log( error )
        }
    }

    return {
        portales,
        obtenerPortales,
        insertarPortal,
        eliminarPortal
    }
})