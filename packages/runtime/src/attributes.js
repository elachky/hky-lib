/**
 * Sets attributes on an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} attrs - An object containing key-value pairs of attributes to set.
 */
export function setAttributes(element, attrs) {
    const { class: className, style, ...otherAttributes } = attrs;

    if (className) {
        setClassName(element, className);
    }

    if (style) {
        Object.entries(style).forEach(([key, value]) => setStyle(element, key, value));
    }

    if (otherAttributes) {
        for (const [key, value] of Object.entries(otherAttributes)) {
            setAttribute(element, key, value);
        }
    }
}

/**
 * Sets a class on an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set the class on.
 * @param {string|string[]} className - The class or array of classes to set.
 */
export function setClassName(element, className) {
    element.className = '';

    if (typeof className === 'string') {
        element.className = className;
    } else if (Array.isArray(className)) {
        element.classList.add(...className);
    }
}

/**
 * Sets a style on an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set the style on.
 * @param {string} key - The key of the style property.
 * @param {string} value - The value of the style property.
 */
export function setStyle(element, key, value) {
    element.style[key] = value;
}

/**
 * Removes a specified style from an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to remove the style from.
 * @param {string} key - The key of the style property to remove.
 */
export function removeStyle(element, key) {
    element.style[key] = null;
}

/**
 * Sets an attribute on an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set the attribute on.
 * @param {string} key - The key of the attribute.
 * @param {string} value - The value of the attribute.
 */
/**
 * Sets an attribute on an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to set the attribute on.
 * @param {string} key - The key of the attribute.
 * @param {string} value - The value of the attribute.
 */
export function setAttribute(element, key, value) {
    if (value === null) {
        removeAttribute(element, key);
    } else if (value.startsWith('data-')) {
        element.dataset[key.replace('data-', '')] = value;
    } else {
        element[key] = value;
    }
}

/**
 * Removes a specified attribute from an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to remove the attribute from.
 * @param {string} key - The key of the attribute to remove.
 */
export function removeAttribute(element, key) {
    element[key] = null;
    element.removeAttribute(key);
}