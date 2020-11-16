function validElement(element: Element | null): boolean {
  if (element === null) {
    return true;
  }

  if (['INPUT', 'TEXTAREA'].includes(element.nodeName)) {
    return false;
  }

  const className = element.getAttribute('class');
  if (className && className.indexOf('editable') > 0) {
    return false;
  }

  return true;
}

export function listen(shortcut: string, handler: () => void): void {
  const listener = (evt: KeyboardEvent) => {
    if (validElement(document.activeElement) === false) {
      return;
    }

    if (evt.key === shortcut) {
      handler();
    }
  };

  document.addEventListener('keyup', listener, false);
}
