import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useAutenticacionStore = defineStore('autenticaciones', () => {
  const usuarioAutenticado = ref(null)
  const isLogin = ref(false)

  const iniciarSesion = async (usuario) => {
    try {
      const { data } = await api.post('/usuarios/login', usuario)
      isLogin.value = true
      localStorage.setItem('token', data)
    } catch (error) {
      notificacion('negative', error.response.data.message)
    }
  }

  // reseteamos el store de la autenticacion
  const cerrarSesion = async () => {
    try {
      usuarioAutenticado.value = null
      localStorage.removeItem('token')
      isLogin.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const autenticarUsuario = async () => {
    const token = localStorage.getItem('token')
    console.log('ENTRO')
    if (!token) {
      // console.log('No hay token')
      return
    }

    const configuracion = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      isLogin.value = true
      const { data } = await api.get('/usuarios/perfil', configuracion)
      usuarioAutenticado.value = { ...data }
    } catch (error) {
      isLogin.value = false
      notificacion('negative', error.response.data.message)
    }
  }

  return {
    iniciarSesion,
    cerrarSesion,
    autenticarUsuario,
    usuarioAutenticado,
    isLogin
  }
})
