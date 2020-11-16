import {
  dispatchEvent,
  getNodesMatching,
  getLinksMatching,
  modal,
} from './dom';

function clickUnsubscribeButton(topButton: HTMLElement) {
  dispatchEvent(topButton, 'click');
  setTimeout(clickUnsubscribeDialogButton, 500);
}

function clickUnsubscribeDialogButton() {
  const [dialogButton] = getNodesMatching('button', /^Unsubscribe$/);

  if (dialogButton) {
    dispatchEvent(dialogButton, 'click');
  } else {
    console.log("Couldn't click unsubscribe button in dialog.");
  }
}

function getUnsubscribeLinks(): HTMLLinkElement[] {
  return (
    getLinksMatching(/unsub|optout|opt out|opt-out/i) ||
    getLinksMatching(/click here|clickhere/i) ||
    getLinksMatching(/email preferences/i) ||
    getLinksMatching(/here/i)
  );
}

function unsubscribeFromLinks() {
  const unsubs = getUnsubscribeLinks();
  const link = unsubs.filter((link) => link.href).pop();

  if (link) {
    console.log(`Opening an unsubscribe link: ${link.href}`);
    window.open(link.href, '_blank')?.focus();
  } else {
    modal("Couldn't find any unsubscribe links.");
  }
}

export function unsubscribe() {
  console.log('Unsubscribe triggered.');
  const [unsubscribeButton] = getNodesMatching('span', /^Unsubscribe$/);

  if (unsubscribeButton) {
    console.log('Found unsubscribe button.');
    clickUnsubscribeButton(unsubscribeButton);
  } else {
    console.log("Couldn't find unsubscribe button.");
    unsubscribeFromLinks();
  }
}
