import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useEmpresasStore = defineStore("empresas2", () =>  {
    // state de portales

    const filtradoEmpresas = ref([])
    const listaEmpresas = ref([])

    // metodos para manipular los portales
    const obtenerEmpresas = async () => {
        try {
            const { data } = await api.get('/empresas')
            listaEmpresas.value = data

            filtradoEmpresas.value = data.map(empresa => {
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

        listaEmpresas,
        filtradoEmpresas,
      

        obtenerEmpresas,
        agregarEmpresa
   
    }
})
