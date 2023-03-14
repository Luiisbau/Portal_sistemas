import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'
import { remplazarTexto } from 'src/helpers/remplazarTexto'

export const useSucursalesStore = defineStore("sucursales", () =>  {
    // state de portales
    const sucursales = ref([])
    const sucursal = ref(null)


    // metodos para manipular los portales
    const obtenerSucursales = async () => {
        try {
            const { data } = await api.get('/sucursales')
            sucursales.value = [ ...data ]
        } catch (error) {
            
            console.log( error )
        }
    }
    const insertarSucursal = async ( sucursal ) => {
        try {
            const { idEmpresa, nombreEmpresa  } = sucursal.idEmpresa

            sucursal.idEmpresa = idEmpresa
            sucursal.nombreEmpresa = nombreEmpresa
    
           const { data } = await api.post('/sucursales', sucursal)
            sucursales.value = [ data, ...sucursales.value ]
            notificacion('positive', `${ data.nombreSucursal } registrado de manera correcta`)
        } catch (error) {
            
            console.log( error )
        }
    }
    
    const obtenerSucursalEditar = ( sucursalObj ) => {
        sucursal.value = sucursales.value.find( sucursal => sucursal.idSucursal === sucursalObj.idSucursal )
        // sucursal.value = sucursales.value.find( sucursal => {
        //     // sustituimos el id de la empresa ( el numero ) por el nombre de la empresa a que pertenece y los mostramos en el modal
        //   sucursal.idEmpresa = remplazarTexto( sucursal.idEmpresa, sucursalObj.nombreEmpresa )

        //   return sucursal.idSucursal === sucursalObj.idSucursal
        // })
    }
    
    const editarSucursal = async ( sucursal ) => {
        try {
            // console.log( sucursal )
            const respuesta = await api.put(`/sucursales/${ sucursal.idSucursal }`, sucursal)
            const sucursalOriginal = sucursales.value.find( sucursalOriginal => sucursalOriginal.idSucursal === sucursal.idSucursal )
            Object.assign( sucursalOriginal, sucursal )
            notificacion( 'positive', respuesta.data.msg )
        } catch (error) {
            notificacion( 'negative', error )
        }
    }


    return {

        sucursales,
        sucursal,
        obtenerSucursales,
        obtenerSucursalEditar,
        insertarSucursal,
        editarSucursal,
    }
})