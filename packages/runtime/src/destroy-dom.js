import { DOM_TYPES } from "./h";
import { removeEventListeners } from "./events";

/**
 * Destroys the given virtual DOM (vDOM) by removing it from the actual DOM.
 *
 * @param {Object} vdom - The virtual DOM object to be destroyed.
 * @returns {void} - This function does not return any value.
 */
export function destroyDom(vdom) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT:
            removeTextNode(vdom);
            break;
        case DOM_TYPES.ELEMENT:
            removeElementNode(vdom);
            break;
        case DOM_TYPES.FRAGEMENT:
            removeFragmentNodes(vdom);
            break;
        default:
            throw new Error(`Unknown virtual DOM type: ${vdom.type}`);
    }
    delete vdom.el;
}

/**
 * Removes the text node from the actual DOM.
 *
 * @param {Object} vdom - The virtual DOM object representing the text node to be removed.
 * @property {Element} vdom.el - The DOM element representing the text node.
 * 
 */
function removeTextNode({ el }) {
    el && el.remove();
}

/**
 * Removes the element node from the actual DOM.
 *
 * @param {Object} vdom - The virtual DOM object representing the element node to be removed.
 * 
 */
function removeElementNode(vdom) {
    const { el, listeners, children } = vdom;

    children.forEach(destroyDom);
    if(listeners) {
        removeEventListeners(listeners, el)
        delete vdom.listeners;
    }
    el.remove();
}



function removeFragmentNodes(vdom) {
    const { children} = vdom;
    children.forEach(destroyDom);
}