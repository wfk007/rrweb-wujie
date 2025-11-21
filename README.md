# rrweb + wujie

reproduce step

1. use node > 22

2. pnpm install

3. cd packages/slave && pnpm run dev

4. cd packages/master && pnpm run dev

5. click button to increase count

6. console.log(window.events) to get the events

7. Paste events in event.json file and watch the replay.


```js
const iframe = window.document.querySelector('IFRAME');
const head = iframe.contentDocument.querySelector('head');

// updated code simulate output
iframe.contentDocument.contains(head); // true

// Previous code simulate output
window.Node.prototype.contains.call(iframe.contentDocument, head); // false
iframe.contentWindow.Node.prototype.contains.bind(iframe.contentDocument)(head); // false
```
