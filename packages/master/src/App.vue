<script setup>
import { ref, nextTick } from 'vue';
import Slave from './components/slave.vue';
import Replay from './components/replay.vue';
import * as rrweb from 'rrweb';
// import * as rrweb from './rrweb-alpha.18';

const { record } = rrweb;
let stopRecord = null;
const events = ref([]);
const showReplay = ref(false);
const showSlave = ref(false);

const onStartRecord = () => {
  stopRecord = record({
    sampling: {
      mouseInteraction: {
        MouseUp: false,
        MouseDown: false,
        Click: true,
        ContextMenu: false,
        DblClick: false,
        Focus: false,
        Blur: false,
        TouchStart: false,
        TouchEnd: false,
      },
      scroll: 300,
      input: 'last',
    },
    slimDOMOptions: {
      script: false,
      comment: false,
      headFavicon: false,
      headWhitespace: false,
      headMetaSocial: false,
      headMetaRobots: false,
      headMetaHttpEquiv: false,
      headMetaVerification: false,
      headMetaAuthorship: false,
      headMetaDescKeywords: false,
      headTitleMutations: false,
    },
    keepIframeSrcFn: () => true,
    emit(event) {
      events.value.push(event);
    },
  });

  // keep salve in increase snapshot
  nextTick(() => {
    showSlave.value = true;
  });
};

const onStopRecord = (evts) => {
  stopRecord?.();
  stopRecord = null;
  showReplay.value = true;
};
</script>

<template>
  <div class="master">
    <h1>wujie master page</h1>

    <div class="operation">
      <button @click="onStartRecord">start record</button>
      <button @click="onStopRecord">stop record</button>
    </div>

    <slave v-if="showSlave"></slave>
    <replay v-if="showReplay" :events="events"></replay>
  </div>
</template>

<style scoped>
.operation {
  display: flex;
  gap: 12px;
}
</style>
