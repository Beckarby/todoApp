import { addNewTodo } from "./script.js";
import { Toast } from "./toast.js";


export class Boton {
    constructor(texto, onClick, color) {
        this.texto = texto;
        this.onClick = onClick;
        this.color = color;
    }

    render() {
        const button = document.createElement("button");
        button.textContent = this.texto;
        button.addEventListener("click", this.onClick);
        button.type = "button"

        // Asignar la clase de CSS
        button.classList.add("boton");
        button.style.backgroundColor = this.color;

        return button;
    }
}

const btns = document.getElementById("btns");

// const boton1 = new Boton("Borrar nota", () => alert("Borrar nota"), "red");
// btns.appendChild(boton1.render());

// const boton2 = new Boton("Modificar nota", () => alert("Modificar nota"), "blue");
// btns.appendChild(boton2.render());

const boton3 = new Boton("Add task", () => {
    const existingInput = document.querySelector("#btns input");
    if (existingInput) return;

    const input = document.createElement("input");
    input.id = "input";
    input.type = "text";
    input.placeholder = "Add task to the list";
    input.style.backgroundColor = "white";
    input.style.borderRadius = "5px";
    input.style.margin = "5px";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Enter";
    submitBtn.style.backgroundColor = "green";
    submitBtn.classList.add("boton");

    const btnsDiv = document.getElementById("btns");
    btnsDiv.appendChild(input);
    btnsDiv.appendChild(submitBtn);

    input.focus();

    const handleEnter = () => {
        const title = input.value.trim();
        if (title) {
            addNewTodo(title);
            input.remove();
            submitBtn.remove();
            const toast = new Toast("Tarea agregada");
            document.body.appendChild(toast.render());
        } else {
            const toast = new Toast("Debes ingresar un título");
            document.body.appendChild(toast.render());
        }
    };

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleEnter();
    });

    submitBtn.addEventListener("click", handleEnter);

}, "green");

btns.appendChild(boton3.render());
