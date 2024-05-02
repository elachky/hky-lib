import {h, hFragment} from 'https://unpkg.com/naby@0.0.0';

const login = () => {};

const increment = () => {};

const app = hFragment([
    h('h1', { class: 'title' }, ['my counter']),
    h('div', { class: 'container' }, [
        h('button', { click: increment }, ['increment']),
        h('span', undefined, ['0']),
        h('button', { click: increment }, ['decrement']),
    ])
]);

document.getElementById('app').innerHTML = app;