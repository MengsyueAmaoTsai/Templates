<template>
  <div>
    <div class="item">
      Node version:
      <span>{{ versionInfo.node }}</span>
    </div>

    <div class="item">
      Nuxt version:
      <span>{{ versionInfo.nuxt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const versionInfo = ref({
  node: process.version ? process.version.replace("v", "") : "",
  nuxt: __NUXT_VERSION__,
});
</script>

<style scoped lang="scss">
.item {
  margin: 10px;
  font-size: 20px;
  font-family: Arial, sans-serif;
}
</style>
