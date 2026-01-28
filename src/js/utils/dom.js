export const select = (selector, scope = document) => {
  try {
    return scope.querySelector(selector);
  } catch {
    return null;
  }
};

export const selectAll = (selector, scope = document) => {
  try {
    return Array.from(scope.querySelectorAll(selector));
  } catch {
    return [];
  }
};

export const delegate = (root, eventName, selector, handler) => {
  if (!root) return () => {};
  const listener = (event) => {
    const target = event.target.closest(selector);
    if (target && root.contains(target)) {
      handler(event, target);
    }
  };
  root.addEventListener(eventName, listener);
  return () => root.removeEventListener(eventName, listener);
};


