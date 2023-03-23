import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import {ID_PORTAL} from 'src/constant/servidor'

export const usePortalesStore = defineStore("portales", () =>  {
    // state de portales
    const portales = ref([])
    const portalesPermisos = ref([])


    // metodos para manipular los portales
    const obtenerPortales = async () => {
        try {
            const { data } = await api.get('/portales')
            const portalesExternos = data.filter(element => element.idPortal != ID_PORTAL )
            portales.value = [ ...portalesExternos ]
            portalesPermisos.value = [...data]
        } catch (error) {
            
            //console.log( error )
        }
    }
    const insertarPortal = async ( portal ) => {
        try {
       const  {data} =   await api.post('/portales', { nombrePortal: portal })
        portales.value = [ data, ...portales.value ]
        } catch (error) {
            
            //console.log( error )
        }
    }
    const eliminarPortal = async ( portal) => {
        try {
            await api.delete(`/portales/${ portal.idPortal }`)
            portales.value = portales.value.filter( portalBusqueda => portalBusqueda.idPortal !== portal.idPortal )
        } catch (error) {
            
            //console.log( error )
        }
    }

    const editarNombrePortal = async ( portal) => {
    const posicion = portales.value.indexOf(portal.portal)

        try {
            await api.put(`/portales/${ portal.portal.idPortal }`, {nombre : portal.nombre})
            portales.value[posicion].nombrePortal = portal.nombre
        } catch (error) {
            
            //console.log( error )
        }
    }

    return {
        portales,
        obtenerPortales,
        insertarPortal,
        eliminarPortal,
        editarNombrePortal,
        portalesPermisos
    }
})