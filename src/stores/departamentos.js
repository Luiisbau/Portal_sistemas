import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useDepartamentoStore = defineStore("departamentos", () =>  {
    // state de departamentos
    const departamentos = ref([])


    // metodos para manipular los departamentos
    const obtenerDepartamentos = async () => {
        try {
            const { data } = await api.get('/departamentos')
            departamentos.value = [ ...data ]
        } catch (error) {
            
            console.log( error )
        }
    }
    const insertarDepartamento = async ( departamento ) => {
        try {
            await api.post('/departamentos', { nombre: departamento })
            departamentos.value = [ { nombre: departamento }, ...roles.value ]
        } catch (error) {
            
            console.log( error )
        }
    }
    const eliminarDepartamento = async ( id ) => {
        try {
            await api.delete(`/departamentos/${ id }`)
            departamentos.value = departamentos.value.filter( departamento => departamento.id !== id )
        } catch (error) {
            
            console.log( error )
        }
    }

    return {
        departamentos,
        obtenerDepartamentos,
        insertarDepartamento,
        eliminarDepartamento
    }
})