import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useDepartamentosStore = defineStore("departamentos", () =>  {
    // state de portales
    const departamentos = ref([])
    const listaDepartamentos = ref([])


    // metodos para manipular los portales
    const obtenerDepartamentos = async () => {
        try {
            const { data } = await api.get('/departamentos')
            departamentos.value = data
            listaDepartamentos.value = data.map(departamento => {
                return {
                  label: departamento.nombreDepartamento,
                  data: departamento
                }
              })
        } catch (error) {
            
            //console.log( error )
        }
    }
    const agregarDepartamento = async ( departamento ) => {
        try {
            const { data } = await api.post('/departamentos', departamento)
            departamento.value = [...departamentos.value, data]
        } catch (error) {
            
            //console.log( error )
        }
    }
   
    return {
       obtenerDepartamentos,
       agregarDepartamento,
       listaDepartamentos
    }
})