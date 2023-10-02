<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
 
<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container md:px-2 px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <h2 class="text-xl font-bold">
            Test vue 3
          </h2>
        </div>
        <div class="flex gap-4 items-center">
          <RouterLink class="router-link" :to="{ name: 'card' }">
            Card
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
 
  <div class="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
  </div>
</template>