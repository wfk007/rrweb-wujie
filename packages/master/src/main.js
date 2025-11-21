import { createApp } from 'vue';
import App from './App.vue';
import Wujie from 'wujie-vue3';
// import * as rrweb from 'rrweb';
import * as rrweb from './rrweb-alpha.18';
import 'rrweb-player/dist/style.css';

const { record } = rrweb;
const { setupApp } = Wujie;

const degrade =
  window.localStorage.getItem('degrade') === 'true' ||
  !window.Proxy ||
  !window.CustomElementRegistry;

const myFetch = (url, options) => {
  console.log('fetch', url, options);
  return window.fetch(url, { ...options, credentials: 'omit' });
};

setupApp({
  name: 'slaves',
  attrs: {},
  exec: true,
  props: {},
  fetch: myFetch,
  plugins: [
    {
      htmlLoader: (code) => {
        console.log('html-loader');
        return code;
      },
      jsBeforeLoaders: [
        {
          callback(appWindow) {
            console.log('js-before-loader-callback', appWindow.__WUJIE.id);
          },
        },
      ],
      jsLoader: (code, url) => {
        console.log('js-loader', url);
        return code;
      },
      jsAfterLoaders: [
        {
          callback(appWindow) {
            console.log('js-after-loader-callback', appWindow.__WUJIE.id);
          },
        },
      ],
      cssBeforeLoaders: [
        //在加载html所有的样式之前添加一个外联样式
        {
          src: 'https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/HDaBURp7.css',
        },
        //在加载html所有的样式之前添加一个内联样式
        { content: 'img{width: 300px}' },
      ],
      cssLoader: (code, url) => {
        console.log('css-loader', url, code.slice(0, 50) + '...');
        return code;
      },
      cssAfterLoaders: [
        //在加载html所有样式之后添加一个外联样式
        {
          src: 'https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/FQsK8IN6.css',
        },
        //在加载html所有样式之后添加一个内联样式
        { content: 'img{height: 300px}' },
      ],
    },
  ],
  prefix: { 'prefix-dialog': '/dialog', 'prefix-location': '/location' },
  degrade,
  beforeLoad: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow) =>
    console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url, e) => console.log(`${url} 加载失败`, e),
});

createApp(App).mount('#app');

window.events = [];

record({
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
    window.events.push(event);
  },
});
