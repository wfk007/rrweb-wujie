<script setup>
import { ref, onMounted } from 'vue';
import WujieVue from 'wujie-vue3';
import events from './events.json';
import rrwebPlayer from 'rrweb-player';

// const slaveRef = ref();

// onMounted(() => {
//   new rrwebPlayer({
//     target: slaveRef.value,
//     props: {
//       events,
//     },
//   });
// });
</script>

<template>
  <div class="master">
    <h1>master page</h1>

    <div class="wrapper">
      <!-- <div class="replay" ref="slaveRef"></div> -->
      <WujieVue
        class="slave"
        width="100%"
        height="100%"
        name="slave"
        url="http://localhost:4444"
        :sync="true"
      ></WujieVue>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 24px;
}

.slave {
  border: 1px solid #eee;
}
</style>
