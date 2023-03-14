<template>
  <q-scroll-area
      :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }"
      :bar-style="{
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }"
      style="height: 400px; max-width: 100%;"
    >
    <q-list>

      <template v-for="(menuItem, index) in menulist" :key="index">
        <q-item
          clickable
          v-ripple
          :to="{ name: menuItem.name }"
          exact
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icono" />
          </q-item-section>

          <q-item-section>
            {{menuItem.label}}
          </q-item-section>
        </q-item>

        <q-separator/>
      </template>

    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const menulist = ref([])
const router = useRouter()
onMounted( () => {
  menulist.value = router.options.routes.find(r => {
    return r.name === 'principal'
  }).children.filter(route => route.label)
  if (router.currentRoute.value.name === 'principal') router.replace({ name: 'dashboard' })
})

</script>
<style lang="sass" scope>
.my-menu-link
  color: white
  background: $primary
</style>