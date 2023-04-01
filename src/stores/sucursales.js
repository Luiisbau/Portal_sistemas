import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useSucursalesStore = defineStore("sucursales", () =>  {
    // state de portales
    const sucursales = ref([])
    const listaSucursales = ref([])

    // metodos para manipular los portales
    const obtenerSucursales = async () => {
        try {
            const { data } = await api.get('/sucursales')
            sucursales.value = data

            listaSucursales.value = data.map(sucursal => {
                return {
                  label: `${sucursal.nombreSucursal} (${sucursal.abreviacion})`,
                  data: sucursal
                }
              })
        } catch (error) {
            
            //console.log( error )
        }
    }
    const agregarSucursal = async ( sucursal ) => {
        try {
            const { data } = await api.post('/sucursales', sucursal )
            
        } catch (error) {
            
            //console.log( error )
        }
    }

    const asignarDepartamento = async ( portal ) => {
        try {
      // const  {data} =   await api.post('/portales', { nombrePortal: portal })
        } catch (error) {
            
            //console.log( error )
        }
    }
   
    return {
       sucursales,
       obtenerSucursales,
       agregarSucursal,
       asignarDepartamento,
       listaSucursales
        
    }
})