function Gracias() {
    alert("Gracias, se ha guardado correctamente");
  }
function Graficado() {
    alert("Se ha graficado correctamente");
  }
  function Borrado() {
    alert("Se ha borrado correctamente");
  }
  function eliminar(id){
  id=parseint(id);
  endPoint="http://127.0.0.1:8000/api/bands/id"
  }
  function mostrarDatos(){
    fetch("http://127.0.0.1:8000/api/bands")

  onclick="eliminar"()
  }
  
  
  const selectElement = document.getElementById("selectOptions");
            
                // URL del endpoint de la API
                const apiUrl = "http://127.0.0.1:8000/api/bands";
            
                // Realizar la solicitud a la API
                fetch(apiUrl)
                  .then(response => response.json())
                  .then(data => {
                    // Iterar sobre los datos y crear opciones para el select
                    data.forEach(option => {
                      const optionElement = document.createElement("option");
                      optionElement.value = option.id;
                      optionElement.textContent = option.nombre;
                      selectElement.appendChild(optionElement);
                    });
                  })
                  .catch(error => console.error("Error al cargar las opciones:", error));
            