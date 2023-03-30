import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useEmpresasStore = defineStore("empresas", () =>  {
    // state de portales
    const empresas = ref([])
    const listaEmpresas = ref([])


    // metodos para manipular los portales
    const obtenerEmpesas = async () => {
        try {
            const { data } = await api.get('/empresas')
            empresas.value = data

            listaEmpresas.value = data.map(empresa => {
                return {
                  label: empresa.division,
                  data: empresa
                }
              })

        } catch (error) {
            
            //console.log( error )
        }
    }
    const agregarEmpresa = async ( empresaNueva ) => {
        try {
            const { data } = await api.post('/empresas', empresaNueva)
            empresas.value = [...empresas.value, data]
        } catch (error) {
            
            //console.log( error )
        }
    }
   
    return {
        empresas,
        listaEmpresas,
       obtenerEmpesas,
       agregarEmpresa
    }
})