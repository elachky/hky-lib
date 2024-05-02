import { mountDom } from "./mount-dom";
import { destroyDom } from "./destroy-dom";
import { Dispatcher } from "./dispacher";

export function createApp({ state, view, reducers = {} }) {
    let parentEl = null;
    let vDom = null;

    
    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

    for (const actionName in reducers) {
        const reducer = reducers[actionName];
        const sub = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(sub);
    }

    function emit(actionName, payload) {
        dispatcher.dispatch(actionName, payload);
    }

    function renderApp() {
        if (vDom) {
            destroyDom(vDom);
        }

        vDom = view(state, emit);
        mountDom(vDom, parentEl);
    }

    return {
        mount(_parentEl) {
            parentEl = _parentEl;
            renderApp();
        },
        unmount() {
            destroyDom(vDom);
            vDom = null;
            subscriptions.forEach(unsubscribe => unsubscribe())
        }
    }
}