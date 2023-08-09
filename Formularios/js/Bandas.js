function Gracias() {
    alert("Gracias, se ha guardado correctamente");
}
function Graficado() {
    alert("Se ha graficado correctamente");
}
function Borrado() {
    alert("Se ha borrado correctamente");
}
function eliminar(id) {
    id = parseint(id);
    endPoint = "http://127.0.0.1:8000/api/bands/id";
}
function mostrarDatos() {
    fetch("http://127.0.0.1:8000/api/bands");

    onclick = "eliminar"();
}

const responseData = [
    { id: 1, name: "Pink Floyd" },
    { id: 2, name: "Iron Maiden" },
    { id: 3, name: "AC/DC" },
];

const selectElement = document.getElementById("selectOptions");

responseData.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.id;
    optionElement.textContent = option.nombre;
    selectElement.appendChild(optionElement);
});
