import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notificacion } from 'src/helpers/mensajes'

export const useInformacionAccesoStore = defineStore("accesos", () => {

  const informacionAcceso = ref([])

  const obtenerTodosAccesos = async () => {
    try {
      const { data } = await api.get('/accesos')
      
      informacionAcceso.value = [...data]
      
    } catch ( error ) {
      notificacion('negative', error.response.data.message)
    }
  }

  return {
    informacionAcceso,
    obtenerTodosAccesos
  }


})
