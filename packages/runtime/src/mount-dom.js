import { DOM_TYPES } from "./h";
import { addEventListeners } from "./events";
import { setAttributes } from "./attributes";

/**
 * Mounts the given virtual DOM (vDom) into the specified parent element.
 *
 * @param {Object} vDom - The virtual DOM to be mounted.
 * @param {Element} parentEl - The parent element where the vDom will be mounted.
 *
 */
export function mountDom(vDom, parentEl) {
    switch (vDom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vDom, parentEl);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vDom, parentEl);
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vDom, parentEl);
            break;
        default:
            console.error(`can't mount DOM element of type ${vDom.type}`);
    }
}

/**
 * Creates a text node and mounts it into the specified parent element.
 *
 * @param {Object} vDom - The virtual DOM to be mounted.
 * @param {Element} parentEl - The parent element where the vDom will be mounted.
 */
function createTextNode(vDom, parentEl) {
    const textNode = document.createTextNode(vDom.value);
    vDom.el = textNode;
    parentEl.append(textNode);
}

/**
 * Creates a fragment node and mounts it into the specified parent element.
 *
 * @param {Object} vDom - The virtual DOM to be mounted.
 * @param {Element} parentEl - The parent element where the vDom will be mounted.
 */
function createFragmentNode(vDom, parentEl) {
    const { children } = vDom;
    vDom.el = parentEl;
    children.forEach(child => mountDom(child, parentEl));
}

/**
 * Creates an element node and mounts it into the specified parent element.
 *
 * @param {Object} vDom - The virtual DOM to be mounted.
 * @param {Element} parentEl - The parent element where the vDom will be mounted.
 */
function createElementNode(vDom, parentEl) {
    const { tag, props, children } = vDom;

    const element = document.createElement(tag);
    addProps(element, props, vDom);

    vDom.el = element;

    children.forEach(child => mountDom(child, element));
    parentEl.append(element);
}

/**
 * Adds properties to an element and returns the listeners.
 *
 * @param {Element} element - The element to which properties will be added.
 * @param {Object} props - The properties to be added to the element.
 * @param {Object} vdom - The virtual DOM object.
 */
function addProps(element, props, vdom) {
    const { on: events, ...attributes } = props;
    vdom.listeners = addEventListeners(events, element);
    setAttributes(element, attributes);
}