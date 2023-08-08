// Fetch para obtener datos de la API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
function consultarGrafica() {
    const chartType = document.getElementById("opcion").value;
    const chartDiv = document.getElementById("myDiv");

    switch (chartType) {
        case "bar":
            fetchData("URL_DEL_ENDPOINT")
                .then(data => {
                    // Obtener los datos necesarios para la gráfica
                    const xData = data.map(item => item.xValue);
                    const yData = data.map(item => item.yValue);

                    createBarChart(xData, yData, chartDiv);
                })
                .catch(error => console.error("Error:", error));
            break;

        case "pie":
            fetchData("URL_DEL_ENDPOINT")
                .then(data => {
                    // Obtener los datos necesarios para la gráfica
                    const labels = data.map(item => item.label);
                    const values = data.map(item => item.value);

                    createPieChart(labels, values, chartDiv);
                })
                .catch(error => console.error("Error:", error));
            break;

        case "radar":
            fetchData("URL_DEL_ENDPOINT")
                .then(data => {
                    // Obtener los datos necesarios para la gráfica
                    const dataArray = data.map(item => item.dataValue);
                    const labels = data.map(item => item.label);

                    createRadarChart(dataArray, labels, chartDiv);
                })
                .catch(error => console.error("Error:", error));
            break;
    }
}

// Agregar evento al botón de consulta
const consultarButton = document.getElementById("consultarButton");
consultarButton.addEventListener("click", consultarGrafica);

// Gráfica 1: Cantidad de copias vendidas por cada álbum
document.getElementById("btnGraph1").addEventListener("click", async () => {
    const albumsData = await fetchData("http://127.0.0.1:8000/api/albums");
    
    // Procesar datos y crear la gráfica
    const albumNames = albumsData.map(album => album.albumName);
    const copiesSold = albumsData.map(album => album.copiesSold);
    
    const graphData = [{
        x: albumNames,
        y: copiesSold,
        type: "bar",
        marker: { color: "blue" }
    }];
    
    const layout = {
        title: "Cantidad de copias vendidas por cada álbum",
        xaxis: { title: "Álbumes" },
        yaxis: { title: "Copias Vendidas" }
    };
    
    createGraph("myDiv1", graphData, layout);
});

// Gráfica 2: Bandas por Género
document.getElementById("btnGraph2").addEventListener("click", async () => {
    const bandsData = await fetchData("http://127.0.0.1:8000/api/bands");
    
    // Procesar datos y crear la gráfica
    const genres = [...new Set(bandsData.map(band => band.type.genreName))];
    const bandCountsByGenre = genres.map(genre => {
        return bandsData.filter(band => band.type.genreName === genre).length;
    });
    
    const graphData = [{
        labels: genres,
        values: bandCountsByGenre,
        type: "pie"
    }];
    
    const layout = {
        title: "Bandas por Género"
    };
    
    createGraph("myDiv2", graphData, layout);
});

// Gráfica 3: Bandas por países
document.getElementById("btnGraph3").addEventListener("click", async () => {
    const bandsData = await fetchData("http://127.0.0.1:8000/api/bands");
    
    // Procesar datos y crear la gráfica
    const countries = [...new Set(bandsData.map(band => band.country))];
    const bandsCountByCountry = countries.map(country => {
        return bandsData.filter(band => band.country === country).length;
    });
    
    const graphData = [{
        x: countries,
        y: bandsCountByCountry,
        type: "bar",
        marker: { color: "orange" }
    }];
    
    const layout = {
        title: "Bandas por Países",
        xaxis: { title: "Países" },
        yaxis: { title: "Cantidad de Bandas" }
    };
    
    createGraph("myDiv3", graphData, layout);
});

// Gráfica 4: Cantidad de géneros musicales
document.getElementById("btnGraph4").addEventListener("click", async () => {
    const genresData = await fetchData("http://127.0.0.1:8000/api/genres");
    
    // Procesar datos y crear la gráfica
    const genreNames = genresData.map(genre => genre.genreName);
    const genreCounts = genresData.map(genre => genre.band_count);
    
    const graphData = [{
        x: genreNames,
        y: genreCounts,
        type: "bar",
        marker: { color: "purple" }
    }];
    
    const layout = {
        title: "Cantidad de Géneros Musicales",
        xaxis: { title: "Géneros Musicales" },
        yaxis: { title: "Cantidad de Bandas por Género" }
    };
    
    createGraph("myDiv4", graphData, layout);
});

// Gráfica 6: Álbumes por décadas
document.getElementById("btnGraph6").addEventListener("click", async () => {
    const albumsData = await fetchData("http://127.0.0.1:8000/api/albums");
    
    // Procesar datos y crear la gráfica
    const decades = ["70's", "80's", "90's", "00's", "10's"];
    const albumsByDecades = [0, 0, 0, 0, 0];
    
    albumsData.forEach(album => {
        const year = parseInt(album.releaseDate.split("-")[0]);
        if (year >= 1970 && year < 1980) albumsByDecades[0]++;
        else if (year >= 1980 && year < 1990) albumsByDecades[1]++;
        else if (year >= 1990 && year < 2000) albumsByDecades[2]++;
        else if (year >= 2000 && year < 2010) albumsByDecades[3]++;
        else if (year >= 2010 && year <= 2021) albumsByDecades[4]++;
    });
    
    const graphData = [{
        x: decades,
        y: albumsByDecades,
        type: "bar",
        marker: { color: "green" }
    }];
    
    const layout = {
        title: "Álbumes por Décadas",
        xaxis: { title: "Décadas" },
        yaxis: { title: "Cantidad de Álbumes" }
    };
    
    createGraph("myDiv6", graphData, layout);
});

