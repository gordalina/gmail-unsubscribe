export function getNodesMatching(
  tagName: string,
  innerTextPattern: RegExp
): HTMLElement[] {
  const nodes = document.getElementsByTagName(
    tagName
  ) as HTMLCollectionOf<HTMLElement>;

  return Array.from(nodes).filter(
    (node: HTMLElement) =>
      node.innerText && node.innerText.match(innerTextPattern)
  );
}

export function getLinksMatching(pattern: RegExp): HTMLLinkElement[] {
  return getNodesMatching('a', pattern) as HTMLLinkElement[];
}

export function dispatchEvent(element: HTMLElement, eventType: string): void {
  const evt = document.createEvent('Events');
  evt.initEvent(eventType, true, false);
  element.dispatchEvent(evt);
}

export function modal(text: string, timeout = 5000) {
  const modal = document.createElement('div');
  const styles = [
    'position: fixed',
    'left: 24px',
    'bottom: 24px',
    'background-color: white',
    'z-index: 100',
    'padding: 8px 52px 8px 24px',
    'color: #5f6368;',
    'border-radius: 4px',
    'box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302), 0 4px 8px 3px rgba(60, 64, 67, 0.149);',
    'font-size: .875rem',
    'letter-spacing: .2px',
    'min-height: 36px',
    'display: flex',
    'align-items: center',
    'line-height: 100%',
  ];

  modal.setAttribute('style', styles.join(';'));
  modal.textContent = text;

  document.body.appendChild(modal);
  setTimeout(() => document.body.removeChild(modal), timeout);
}
