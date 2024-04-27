/**
 * Adds event listeners to an element based on the provided event names and handlers.
 *
 * @param {Object} events - An object containing event names as keys and their corresponding handler functions as values.
 * @param {Element} element - The element to which the event listeners will be added.
 *
 * @returns {Object} - An object containing the added event listeners.
 */
export function addEventListeners(events = {}, element) {
    const addedEventListeners = {};
    
    Object.entries(events).forEach(([eventName, handler]) => {
        addEventListener(eventName, handler, element);
        addedEventListeners[eventName] = handler;
    });

    return addedEventListeners;
}

/**
 * Adds an event listener to an element.
 *
 * @param {string} eventName - The name of the event to be listened for.
 * @param {Function} handler - The function to be called when the event is triggered.
 * @param {Element} element - The element to which the event listener will be added.
 *
 * @returns {Function} - The function that was added as the event listener.
 */
export function addEventListener(eventName, handler, element) {
    element.addEventListener(eventName, handler);
    return handler;
}


export function removeEventListeners(listeners, el) {

    Object.entries(listeners).forEach(([event, listener]) => {
        el.removeEventListener(event, listener);
    })
}