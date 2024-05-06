import { createApp, h, hFragment } from "../../packages/runtime/dist/naby.js"; // "https://registry.npmjs.org/naby"

const editInitialState = {
    edited: null,
    original: null,
    idx: null,
}

const currentValueInit = {
    value: '',
    done: false,
} ;

const state = {
    currentTodo: currentValueInit,
    todoList: [{value:'do somthing', done: false}, {value: 'go to your bed', done:true},],
    edit: editInitialState
}

const reducers = {
    'add-todo': state => ({...state, todoList: [...state.todoList, state.currentTodo], currentTodo: currentValueInit}),
    'current-todo-change': (state, value) => ({...state, currentTodo: {value, done: false}}),
    'mark-as-done': (state, idx) => {
        const todoList = [...state.todoList];
        todoList[idx].done = !todoList[idx].done;

        return {
            ...state, 
            todoList
        }
    },
    'start-editing': (state, idx) => ({...state, edit: {idx, original: state.todoList[idx], edited: state.todoList[idx]}}),
    'edit-todo': (state, edit) => ({...state, edit}),
    'save-edit':(state) => {
        const todoList = [...state.todoList];
        todoList[state.edit.idx] = state.edit.edited;
        return {
            ...state, 
            todoList,
            edit: editInitialState
        }
    },
    'cancel-edit':(state) => ({...state, edit: editInitialState}),
}

const Header = () => h('h1', { class: 'title' }, ['first application writen using my framework :)']);

const TodoForm = ({currentTodo}, emit) => {
    return h('div', {class: 'header'}, [
        h('input', {type: 'text', value: currentTodo.value, on: {
            keydown: (event) => {
                if (event.key === 'Enter'&& currentTodo.value.length >= 3) {
                    emit('add-todo', event.target.value);
                }
            },
            // how to fix losing focus every time change the value
            input: (event) => emit('current-todo-change', event.target.value)
        }}),
        h('button', {type: 'text', disabled: currentTodo.value.length < 3, on: {
            click: () => {
                emit('add-todo', currentTodo);
            }
        }}, ['add todo']),
    ]);
};

const TodoList = ({todoList, edit}, emit) => {
    return h('ul', {class:"todo-list"}, [
            hFragment([
                ...todoList.map((todo, idx) => TodoItem({todo, edit, idx}, emit))
            ])
        ]);
};

const TodoItem = ({todo, edit, idx}, emit) => edit.idx === idx 
                ? TodoFormEdit({edit}, emit) 
                : TodoReadMode({todo, idx}, emit);


const TodoFormEdit = ({edit}, emit) => {
    return h('li', {
        class: 'todo-item todo-edit'
    },[
        h('input', {
            value: edit.edited.value,
            on: {
                input: (e) => {
                    emit('edit-todo', {...edit, edited: {value: e.target.value, done: edit.edited.done}});
                },
                keydown: (e) => {
                    if (e.key === 'Enter' && e.length >= 3) {
                        emit('save-edit');
                    }
                },
            }
        }),
        h(
            'button',
            {
                type: 'text', 
                disabled: edit.edited.value.length < 3,
                on: { click: () => emit('save-edit') }
            },
            ['Save']
        ),
        h('button', {type: 'text', on: {
            click: () => emit('cancel-edit')
            }
        }, ['Cancel']),
    ]);   
}

const TodoReadMode = ({todo, idx}, emit) => {
    return h('li', {
        class: 'todo-item',
        on: {
            dblclick: () => {
                emit('start-editing', idx);
            }
        }
    },[
        h('span', {class:`${todo.done ? 'todo-done' : ''}`}, [todo.value]),
        h('button', {type: 'text', on: {
            click: (e) => {
                e.stopPropagation();
                emit('mark-as-done', idx);
            }
        }}, [`${todo.done ? 'undone' : 'done'}`]),
    ]);
}



const App = createApp({
    state,
    reducers,
    view: (state, emit) => {
        return hFragment([
            Header(),
            TodoForm(state, emit),
            TodoList(state, emit), 
        ]);
    }

});

App.mount(document.body)
