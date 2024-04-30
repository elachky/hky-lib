export class Dispatcher {
    #subs = new Map();
    #afterHandlers = [];

    /**
     * Subscribes to a command.
     * @param {string} commandName - The name of the command to subscribe to.
     * @param {Function} handler - The function to be called when the command is dispatched.
     * @returns {Function} - A function that, when called, unsubscribes the provided handler from the command.
    **/
    subscribe(commandName, handler) {
        if (!this.#subs.has(commandName)) {
            this.#subs.set(commandName, []);
        }

        const handlers = this.#subs.get(commandName);

        if (handlers.includes(handler)) {
            return () => {};
        }

        handlers.push(handler);

        return () => {
            const index = handlers.indexOf(handler);
            if (index < 0) {
                // that will never happen because of handlers.includes(handler) => (() => {}) on above
                return console.error(`Command ${commandName} already unregistered`);
            } 
            handlers.splice(index, 1);
        };
    }

    /**
     * Registers a handler to be called after every command is dispatched.
     * @param {Function} handler - The function to be called after every command.
     * @returns {Function} - A function that, when called, unregisters the provided handler from the after-every-command list.
     */
    afterEveryCommand(handler) {
        this.#afterHandlers.push(handler);

        return () => {
            const index = this.#afterHandlers.indexOf(handler);
            this.#afterHandlers.splice(index, 1);
        };
    }

    /**
     * Dispatches a command and executes all subscribed handlers.
     * @param {string} commandName - The name of the command to dispatch.
     * @param {...any} payload - Additional parameters to be passed to the handlers.
     */
    dispatch(commandName, ...payload) {
        if (this.#subs.has(commandName)) {
            this.#subs
                .get(commandName)
                .forEach((handler) => {
                    handler(...payload);
                });
        } else {
            console.error(`no handlers for the commande: ${commandName}`);
        }

        this.#afterHandlers.forEach(handler => handler());
    }

}