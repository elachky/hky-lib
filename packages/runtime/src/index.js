import { destroyDom } from './destroy-dom';
import { h, hFragment, lipsum, hString } from './h';
import { mountDom } from './mount-dom';
import { Dispatcher } from './dispacher';

// console.log(h('div'));

const login = () => {};
const increment = () => {};

// console.log(h('form', {class: 'login-form', action:'login'}, 
// [
//     h('input', {type: 'text', name: 'user'}),
//     h('input', {type: 'password',  name: 'password'}),
//     h('button', {click:login}, ['login']),
// ]));
const vdom = h('section', {}, [
        h('h1', {}, ['My Blog']),
        h('p', {class:'just a class X|'}, ['Welcome to my blog!']),
        h('button', {on:{click:() => console.log('don\'t :3')}}, ['hey'])
    ]
)
    

// console.log(
//     JSON.stringify(
//     hFragment([
//     h('h1', {class: 'title'}, ['my counter']),
//     h('div', {class: 'container'},
//         [
//             h('button', {click: increment}, ['increment']),
//             h('span', undefined, ['0']),
//             h('button', {click: increment}, ['decrement']),
//         ]
//     ),
// ], null, 10)));
// // console.log('################################')
// // console.log(JSON.stringify(lipsum(3)));

// function MessageComponent(level, message) {
//     return h('div', {class: `message ${level}-message`}, [h('p', {}, [message])])
// }

// console.log(JSON.stringify(MessageComponent('warnning', 'you create your first component!!!')))

// mountDom(vdom, $0);
// destroyDom(vdom);

const dispatcher = new Dispatcher();

const unsubscribe = dispatcher.subscribe('response', () => {console.log(`fine my friend thanks`);});
const unsubscribe2 = dispatcher.subscribe('hi', (name) => {console.log(`hi ${name} how are you`);});
dispatcher.afterEveryCommand(() => console.log('################################'))
dispatcher.dispatch('hi','nabil');
dispatcher.dispatch('response');
unsubscribe2();
unsubscribe();
dispatcher.dispatch('hi','nabil');
dispatcher.dispatch('response');





