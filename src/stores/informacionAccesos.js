import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { notificacion } from "src/helpers/mensajes";

export const useInformacionAccesoStore = defineStore("accesos", () => {
  const informacionAcceso = ref([]);
  const informacionAccesoFiltrado = ref([]);

  const obtenerTodosAccesos = async () => {
    try {
      const { data } = await api.get("/accesos");

      informacionAcceso.value = [...data];
      //console.log(informacionAcceso.value[0].usuario.nombre);
      // informacionAccesoFiltrado.value = informacionAcceso.value.filter(
      //  (e) => e.value[0].usuario.nombre);
    } catch (error) {
      notificacion("negative", error.response.data.message);
    }
  };

  return {
    informacionAcceso,
    informacionAccesoFiltrado,
    obtenerTodosAccesos,
  };
});
