import { unsubscribe } from './gmail';

chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (sender.id !== chrome.runtime.id) {
    return;
  }

  switch (message.command) {
    case 'unsubscribe':
      res({ unsubscribed: unsubscribe() });
      break;
  }
});
