// Fetch para obtener datos de la API
function fetchData(url) {
    return fetch(url).then(response => response.json());
}

// Función para crear la gráfica de barras
function createBarChart(xData, yData, chartDiv) {
    const data = [{
        x: xData,
        y: yData,
        type: "bar"
    }];

    const layout = {
        title: "Título de la gráfica",
        xaxis: { title: "Eje X" },
        yaxis: { title: "Eje Y" }
    };

    Plotly.newPlot(chartDiv, data, layout);
}

// Función para crear la gráfica de pastel
function createPieChart(labels, values, chartDiv) {
    const data = [{
        labels: labels,
        values: values,
        type: "pie"
    }];

    const layout = {
        title: "Título de la gráfica"
    };

    Plotly.newPlot(chartDiv, data, layout);
}

// Función para crear la gráfica de radar
function createRadarChart(dataArray, labels, chartDiv) {
    const data = [{
        type: "scatterpolar",
        r: dataArray,
        theta: labels,
        fill: "toself"
    }];

    const layout = {
        polar: {
            radialaxis: { visible: true, range: [0, Math.max(...dataArray)] }
        },
        showlegend: false
    };

    Plotly.newPlot(chartDiv, data, layout);
}

// Función para consultar y mostrar la gráfica
function consultarGrafica(buttonId, fetchUrl, chartFunction) {
    const chartDiv = document.getElementById("genreCountChart");
    const button = document.getElementById(buttonId);

    button.addEventListener("click", () => {
        fetchData(fetchUrl)
            .then(data => {
                chartFunction(data, chartDiv);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
}

// Consultar gráficas utilizando los botones y funciones correspondientes
consultarGrafica("button_1", "http://127.0.0.1:8000/api/albums", createBarChart); // Cantidad de copias vendidas por cada álbum
consultarGrafica("button_2", "http://127.0.0.1:8000/api/genres", createPieChart); // Bandas por género
consultarGrafica("button_3", "http://127.0.0.1:8000/api/bands", createRadarChart); // Bandas por países
consultarGrafica("button_4", "http://127.0.0.1:8000/api/genres", createPieChart); // Cantidad de géneros musicales
consultarGrafica("button_5", "http://127.0.0.1:8000/api/concerts", createBarChart); // Conciertos por cada lugar en el que se realizó
consultarGrafica("button_6", "http://127.0.0.1:8000/api/albums", createRadarChart); // Álbumes por décadas
