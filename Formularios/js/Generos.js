function Save() {
    //alert("Gracias, se ha guardado correctamente");
    const selectElement = document.getElementById("genderName");
    console.log(selectElement.value);
    fetch("http://127.0.0.1:8000/api/genres", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Rock and Roll 2",
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}
function Graficado() {
    alert("Se ha graficado correctamente");
}
function Borrado() {
    alert("Se ha borrado correctamente");
}
