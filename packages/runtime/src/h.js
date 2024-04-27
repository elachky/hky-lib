import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGEMENT: 'fragment',
}
/**
 * Creates a virtual DOM element using the provided tag, props, and children.
 *
 * @param {string} tag - The tag name of the virtual DOM element.
 * @param {Object} props - An object containing the properties of the virtual DOM element.
 * @param {Array} children - An array containing the children of the virtual DOM element.
 *
 * @returns {Object} - An object representing the virtual DOM element.
 */
export const h = (tag, props = {}, children = []) =>  {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    };
};

/**
 * Maps the text nodes in the provided children array and returns the mapped array.
 *
 * @param {Array} children - An array containing the children of the virtual DOM element.
 *
 * @returns {Array} - An array containing the mapped text nodes.
 */
function mapTextNodes(children) {
    return children.map(child => 
        typeof child === 'string' ? hString(child) : child
    );
}

/**
 * Creates a virtual DOM text node with the provided value.
 *
 * @param {string} value - The value of the virtual DOM text node.
 *
 * @returns {Object} - An object representing the virtual DOM text node.
 */
export function hString(str) {
    return {
        type: DOM_TYPES.TEXT,
        value: str,
    };
}

/**
 * Creates a virtual DOM fragment with the provided children array.
 *
 * @param {Array} children - An array containing the children of the virtual DOM fragment.
 *
 * @returns {Object} - An object representing the virtual DOM fragment.
 */
export function hFragment(vNode) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNode)),
    };
}

/**
 * Generates a placeholder lipsum text for the specified length.
 *
 * @param {number} length - The length of the lipsum text to be generated.
 *
 * @returns {Object} - An object representing the virtual DOM fragment containing the lipsum text.
 */
export function lipsum(length) {
    const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n" +
        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n" +
        "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
        "commodo consequat.";

    return hFragment(Array.from({length}, _ => h('p', undefined, [placeholder])));
}