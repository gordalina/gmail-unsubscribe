import {
  getNodesMatching,
  getLinksMatching,
  modal,
} from './dom';

function clickUnsubscribeDialogButton() {
  const [dialogButton] = getNodesMatching('button', /^Unsubscribe$/);

  if (!dialogButton) {
    console.log("Couldn't click unsubscribe button in dialog.");
    return false;
  }

  dialogButton.click();
  return true;
}

function getUnsubscribeLinks(): HTMLLinkElement[] {
  const pattern = [
    `unsub(scribe)?`,
    `opt(-| )?out`,
    `click ?here`,
    `email (preferences|settings)`,
    `here`,
  ];

  return getLinksMatching(new RegExp(pattern.join('|'), 'i'));
}

function unsubscribeFromLinks() {
  const links = getUnsubscribeLinks();
  const link = links.filter((link) => link.href).pop();

  if (!link) {
    modal("Couldn't find any unsubscribe links.");
    return false;
  }

  console.log(`Opening an unsubscribe link: ${link.href}`);
  window.open(link.href, '_blank')?.focus();
  return true;
}

export function unsubscribe() {
  console.log('Unsubscribe triggered.');
  const [unsubscribeButton] = getNodesMatching('span', /^Unsubscribe$/);

  if (unsubscribeButton) {
    console.log('Found unsubscribe button.');
    unsubscribeButton.click();
    setTimeout(clickUnsubscribeDialogButton, 500);

    return true;
  } else {
    console.log("Couldn't find unsubscribe button.");
    return unsubscribeFromLinks();
  }
}
