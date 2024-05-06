let todoList = [
    { description: 'walk the dog', done:true },
    { description: 'play league', done:false },
    { description:'read my book', done:false }
];

const addTodoInput = document.getElementById('add-todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListElement = document.getElementById('todo-list-ul');

// event handlers
addTodoInput.addEventListener('input', (e) => {
    addTodoBtn.disabled = e.target.value.length < 3
})
addTodoInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addToDo();
    }
});
addTodoBtn?.addEventListener('click', addToDo);

renderTodoList();

function addToDo() {
    const todo = {description: addTodoInput.value, done: false};
    if (todo.length < 3) {
        return;
    }
    if (todoList.findIndex(({description}) => description === todo.description) !== - 1) {
        alert(`"${todo.description}" already exists`);
        return;
    }
    todoList.push(todo);
    todoListElement.append(renderReadMode(todo));
    addTodoInput.value = '';
    addTodoBtn.disabled = e.target.value.length < 3
}

function renderTodoList() {
    todoList.forEach(todo => {
        const todoElement = renderReadMode(todo)
        todoListElement.append(todoElement);
    } );
};

function renderReadMode(todo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.innerText = todo.description;
    span.style.textDecorationLine = todo.done ? 'line-through' : 'none',
    button.innerText = todo.done ? 'undone' : 'done';

    li.appendChild(span);
    li.appendChild(button);

    button.addEventListener('click', () => {
        todo.done = !todo.done;
        markAsDone(todo);
    });
    span.addEventListener('dblclick', () => {
        if (todo.done) {
            alert(`"${todo.description}" already done to edit it you should undone it first.`);
            return;
        }
        todoListElement.replaceChild(renderEditMode(todo), todoListElement.childNodes[todoList.findIndex(({description}) => description === todo.description)]);
    })
    return li;
}

function renderEditMode(todo) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const cancelButton = document.createElement('button');
    const saveButton = document.createElement('button');

    saveButton.innerText = 'save';
    cancelButton.innerText = 'cancel';
    input.type = 'text';
    input.value = todo.description;

    li.appendChild(input);
    li.appendChild(cancelButton);
    li.appendChild(saveButton);
    
    saveButton.addEventListener('click', () => {
        updateTodo({description: input.value, done: todo.done}, todo);
    });
    
    cancelButton.addEventListener('click', () => {
        todoListElement.replaceChild(renderReadMode(todo), li);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // confirm('are you sure ?') && 
            updateTodo({description: input.value, done: todo.done}, todo);
        }
    });
    return li;
}


function updateTodo(newValue, oldValue) {
    const index = todoList.findIndex(({description}) => description === oldValue.description);
    const oldNode = todoListElement.childNodes[index];

    todoListElement.replaceChild(renderReadMode(newValue), oldNode);
    todoList.splice(index, 1, newValue);
}
// not working why ?
function markAsDone(oldTodo) {
    let index = -1;
    
    todoList = todoList.map((todo, i) => {
        if (todo.description === oldTodo.description) {
            index = i;
            return {...todo, done: !todo.done};
        }
        return todo;
    });
    if (index === -1) return;

    todoListElement.childNodes[index].childNodes[0].style.textDecorationLine = oldTodo.done ? 'line-through' : 'none';
    todoListElement.childNodes[index].childNodes[1].innerText = oldTodo.done ? 'undone' : 'done';
}
