<script setup>
import WujieVue from 'wujie-vue3';
</script>

<template>
  <WujieVue
    class="slave"
    width="100%"
    height="100%"
    name="slave"
    url="http://localhost:4444"
    :sync="true"
  ></WujieVue>
</template>

<style scoped>
.slave {
  border: 1px solid #eee;
}
</style>
