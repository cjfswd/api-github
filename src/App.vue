<script async setup lang="ts">
import Container from "./components/container.vue";
</script>

<template>
  <Suspense>
    <Container />
  </Suspense>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

strong{
  font-weight: bold;
}

code{
  border-radius: 0.25em;
}

:root {
  color-scheme: dark;
}
</style>
