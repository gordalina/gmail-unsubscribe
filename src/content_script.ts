import { unsubscribe } from './gmail';

chrome.runtime.onMessage.addListener((req, _sender, res) => {
  if (req.gmail_unsubscribe === true) {
    unsubscribe();
    res({ok: true})
  }
});
