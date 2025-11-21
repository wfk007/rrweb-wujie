import { createApp } from 'vue';
import App from './App.vue';

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App).mount('#app');
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
} else {
  createApp(App).mount('#app');
}
