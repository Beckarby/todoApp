import { Card } from './card.js';
import { Toast } from './toast.js';

let todos = [];
let currentFilter = 'all';

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo obtener la data')
        }
        return response.json();
    })
    .then(data => {
        todos = data;
        renderTodos();
    })
    .catch(error => console.error(error));
    
function renderTodos() {
    //container.innerHTML = '';
    const cardsDiv = document.getElementById('cards');
    cardsDiv.innerHTML = '';

    const filtered = todos.filter(todo => {
        if (currentFilter === 'completed') {
            return todo.completed;
        } else if (currentFilter === 'pending') {
            return !todo.completed;
        }
        return true;
    })

    filtered.forEach(todo => {
        const card = new Card(todo.id, todo.title, todo.completed);
        cardsDiv.appendChild(card.render());
    })
    
    
}

document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentFilter = e.target.value.toLowerCase();
        renderTodos();
        const toast = new Toast(`Showing ${currentFilter} tasks`);
        document.body.appendChild(toast.render());        
    })
})

export function addNewTodo(title) {
    const newTodo = {
        id: Math.floor(Math.random() * 1000) + 2000,
        title,
        completed: false
    };
    todos.unshift(newTodo);
    renderTodos();
}

    