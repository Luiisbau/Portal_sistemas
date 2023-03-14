import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useEmpresaStore = defineStore("empresas", () =>  {
    // state de empresas
    const empresas = ref([])
    const empresa = ref(null)


    // metodos para manipular los empresas
    const obtenerEmpresas = async () => {
        try {
            const { data } = await api.get('/empresas')
            empresas.value = [ ...data ]
        } catch (error) {
            
            notificacion( 'negative', 'Error al obtener las empresas' )
        }
    }
    const insertarEmpresa = async ( empresa ) => {
        try {
            const respuesta = await api.post('/empresas', empresa)
            empresas.value = [ respuesta.data, ...empresas.value ]
            notificacion('positive', `${ respuesta.data.nombreEmpresa } registrado de manera correcta`)
        } catch (error) {
            
            notificacion( 'negative', error.response.data.msg )
        }
    }
    const eliminarEmpresa = async ( id ) => {
        try {
            await api.delete(`/empresas/${ id }`)
            empresas.value = empresas.value.filter( empresa => empresa.idEmpresa !== id )
        } catch (error) {
            
            console.log( error )
        }
    }

    const obtenerEmpresaEditar = ( id ) => {
        empresa.value = empresas.value.find( empresa => empresa.idEmpresa === id )
    }

    const editarEmpresa = async ( empresa ) => {
        try {
            
            const respuesta = await api.put(`/empresas/${ empresa.idEmpresa }`, empresa)
            const empresaOriginal =  empresas.value.find( empresaOriginal => empresaOriginal.idEmpresa === empresa.idEmpresa )
            
            Object.assign( empresaOriginal, empresa )

            notificacion( 'positive', respuesta.data.msg )
            
            
        } catch (error) {
            
            console.log( error )
        }
    }

    return {
        empresas,
        empresa,
        obtenerEmpresas,
        insertarEmpresa,
        eliminarEmpresa,
        obtenerEmpresaEditar,
        editarEmpresa
    }
})