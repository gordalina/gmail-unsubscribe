import { unsubscribe } from './gmail';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'unsubscribe') {
    const result = unsubscribe();
    sendResponse({ unsubscribed: result });
  }
});
