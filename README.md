# rrweb + wujie

reproduce step

1. use node > 22.12+ (because of vite)

2. pnpm install

3. cd packages/slave && pnpm run dev

4. cd packages/master && pnpm run dev

5. click button `start record` to start rrweb record

6. click button `count is 0` to increase count and generate MutationObserver

6. click button `stop record` to  stop rrweb record, generate events and show the replay

7. All dom in `wujie slave page` is missing when replay

but when you change `packages/master/src/App.vue` with below changes, and repeat the step above, it works!

```js
// import * as rrweb from 'rrweb';
import * as rrweb from './rrweb-alpha.18'; // I updated it with commit change
```

some related logs:

```js
const iframe = window.document.querySelector('IFRAME');
const head = iframe.contentDocument.querySelector('head');

// updated code simulate output
iframe.contentDocument.contains(head); // true

// Previous code simulate output
window.Node.prototype.contains.call(iframe.contentDocument, head); // false
iframe.contentWindow.Node.prototype.contains.bind(iframe.contentDocument)(head); // false
```
