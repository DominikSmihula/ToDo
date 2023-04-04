<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
