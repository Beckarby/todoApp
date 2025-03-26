import { Toast } from "./toast.js";  
import { Boton } from "./boton.js"
    
export class Card {
    constructor(id, title, completed, change) {
        this.id = id;
        this.title = title; // Whatever title (ipsum lorem)
        this.completed = completed; // boolean
        this.change = change;
    }

    render() {
        const card = document.createElement("div");
        const titleElement = document.createElement("span");
        titleElement.textContent = this.title;
        card.appendChild(titleElement);

        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");

        const statusCheck = document.createElement("input");
        statusCheck.name = "statusCheck";
        statusCheck.type = "checkbox";
        statusCheck.label = "status";
        statusCheck.classList.add("status-check");
        statusCheck.checked = this.completed;

        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Status";
        statusLabel.htmlFor = statusCheck.name;

        // check if the task is completed
        statusCheck.addEventListener('change', () => {
            this.completed = statusCheck.checked;
            if (this.change) {
                this.change(this.id, this.completed);
            }
            if (this.completed) {
                card.style.backgroundColor = "#2D4521"; 
                fetch(`https://jsonplaceholder.typicode.com/todos/${this.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: true
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un error al completar la tarea')
                    }
                    return response.json();
                })
                .then(data => {
                    const toast = new Toast('Tarea completada');
                    document.body.appendChild(toast.render());
                    console.log('Tarea completada ', data) 
                })
            } else {
                card.style.backgroundColor = "#27445D"; 
                fetch(`https://jsonplaceholder.typicode.com/todos/${this.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: false
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Tarea descompletada??')
                    }
                    return response.json();
                })
                .then(data => {
                    const toast = new Toast('Tarea no completada');
                    document.body.appendChild(toast.render());
                    console.log('Tarea no completada ', data) 
                })
            }
        })

        card.style.backgroundColor = this.completed ? "#2d4521" : "#27445D"; 
    
        card.classList.add("card");

        // checkbox to delete the task
        const deleteBtn = new Boton("delete", () => {

            const confirmCard = document.createElement("div");
            confirmCard.classList.add("confirm-card");
            const confirmMessage = document.createElement("p");
            confirmMessage.textContent = "¿Estás seguro que deseas eliminar la tarea?";
            confirmCard.appendChild(confirmMessage);
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            document.body.appendChild(overlay);

            const confirmBtn = new Boton("Yes", () => {
                fetch(`https://jsonplaceholder.typicode.com/todos/${this.id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo eliminar el task')
                    }
                    return response.json();
                })
                .then(data => {
                    const toast = new Toast('Tarea eliminada');
                    document.body.appendChild(toast.render());
                    console.log('Tarea eliminada', data);
                    card.style.opacity = 0;
                    card.style.transform = "translateX(50px)";
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);    
                    document.body.removeChild(confirmCard);  
                    document.body.removeChild(overlay);          
                })
                .catch(error => console.error(error));
            }, "#B82132");

            const cancelBtn = new Boton("No", () => {
                document.body.removeChild(confirmCard);
                document.body.removeChild(overlay);
            }, "#4a7c59");

            confirmCard.appendChild(confirmBtn.render());
            confirmCard.appendChild(cancelBtn.render());

            document.body.appendChild(confirmCard);

        }, "#B82132")

        
        checkboxContainer.appendChild(statusCheck);
        checkboxContainer.appendChild(statusLabel);
        //checkboxContainer.appendChild(deleteCheck);
        //checkboxContainer.appendChild(deleteLabel);
        card.appendChild(checkboxContainer);
        card.appendChild(deleteBtn.render())

        return card;
    }
}



