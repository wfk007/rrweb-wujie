<script setup>
import { ref, onMounted } from 'vue';
import rrwebPlayer from 'rrweb-player';

const props = defineProps({
  events: Array,
});

console.log('events', props.events);

const slaveRef = ref();

onMounted(() => {
  if (slaveRef.value) {
    new rrwebPlayer({
      target: slaveRef.value,
      props: {
        events: props.events,
      },
    });
  }
});
</script>

<template>
  <div class="replay">
    <h2>replay page</h2>
    <div ref="slaveRef"></div>
  </div>
</template>

<style scoped>
.replay {
  margin-top: 12px;
}
</style>
