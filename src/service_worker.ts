chrome.commands.onCommand.addListener((command) => {
  if (command !== 'unsubscribe') {
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    if (tab === undefined || typeof tab.id !== 'number') {
      return;
    }

    chrome.tabs.sendMessage(tab.id, { command: 'unsubscribe' });
  });
});
