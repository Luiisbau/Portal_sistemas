import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from '../helpers/mensajes'

export const useRolStore = defineStore("roles", () =>  {
    // state de roles de usuario
    const roles = ref([])
    const rol = ref(null)


    // metodos para manipular los roles de usuarios
    const obtenerRoles = async () => {
        try {
            const { data } = await api.get('/roles')
            roles.value = [ ...data ]
        } catch ( error ) {
            notificacion( 'negative', 'Error al obtener los roles' )
        }
    }
    const insertarRol = async ( rolObj ) => {
        try {
            const respuesta = await api.post('/roles', rolObj)

            roles.value = [ respuesta.data, ...roles.value ]
            notificacion('positive', `${ respuesta.data.nombreRol } registrado de manera correcta`)

        } catch ( error ) {
            
            notificacion( 'negative', error.response.data.msg )
        }
    }
    const eliminarRol = async ( id ) => {
        try {
            await api.delete(`/roles/${ id }`)
            roles.value = roles.value.filter( rol => rol.idRol !== id )
        } catch ( error ) {

            notificacion( 'negative', error.response.data.msg )

        }
    }

    const obtenerRolEditar = ( id ) => {
        rol.value = roles.value.find( rol => rol.idRol === id )
    }

    const editarRol = async ( rol ) => {

        try {
            const respuesta = await api.put(`/roles/${ rol.idRol }`, rol)
            const rolOriginal = roles.value.find( roloriginal => roloriginal.idRol === rol.idRol )
            Object.assign( rolOriginal, rol )
            notificacion( 'positive', respuesta.data.msg )
        } catch ( error ) {
            notificacion( 'negative', error.response.data.msg )


        }
    }

    return {
        roles,
        rol,
        obtenerRoles,
        insertarRol,
        editarRol,
        obtenerRolEditar,
        eliminarRol
    }
})