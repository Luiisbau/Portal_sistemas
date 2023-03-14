<template>
  <div class="contenedor">
    <h2>Inicio</h2>
    <q-separator color="primary" class="q-my-md" inset />
    <div class="cards-dashboard">
      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">apartment</span>
          <h3>Empresas registradas</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>

      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">room_preferences</span>
          <h3>Departamentos registrados</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>

      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">person</span>
          <h3>Usuarios activos</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>

      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">person_off</span>
          <h3>Usuarios inactivos</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>

      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">corporate_fare</span>
          <h3>Sucursales registradas</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>

      <q-card class="card">
        <q-card-section class="contenido-card">
          <span class="material-icons text-primary">language</span>
          <h3>Portales registrados</h3>
          <p class="text-primary">1</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      
    }
  }
}
</script>

<style scoped>
.link-tablero {
  text-decoration: none;
  color: black;
  cursor: pointer;
  user-select: none;
}
</style>