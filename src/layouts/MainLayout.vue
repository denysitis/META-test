<template>
  <div class="app-layout">
    <TheHeader />

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '../components/TheHeader.vue'
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-main {
  flex: 1;
}
</style>
