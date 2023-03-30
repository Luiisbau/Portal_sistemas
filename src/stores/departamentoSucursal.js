import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useDepartamentoSucursalStore = defineStore("departamentoSucursal", () =>  {
 
    const agregarDepartamentoSucursal = async ( departamentosSucursal ) => {
        try {
            const { data } = await api.post('/departamentosSucursal', departamentosSucursal)
            console.log(data)
        } catch (error) {
            
            //console.log( error )
        }
    }
   
    return {
        agregarDepartamentoSucursal
    }
})