/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
export default function getShadowSelector(generateSelector, elm = {}) {
  if (!elm) {
    return '';
  }
  let doc = (elm.getRootNode && elm.getRootNode()) || document;
  // Not a DOCUMENT_FRAGMENT - shadow DOM
  if (doc.nodeType !== 11) {
    return generateSelector(elm);
  }

  const stack = [];
  while (doc.nodeType === 11) {
    if (!doc.host) {
      return '';
    }
    stack.unshift({ elm, doc });
    elm = doc.host;
    doc = elm.getRootNode();
  }

  stack.unshift({ elm, doc });
  return stack.map(item => generateSelector(item.elm));
}
