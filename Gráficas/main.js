<script type="module">
// Obtener datos de los endpoints usando Fetch API
function consultarCopiasVendidas() {
    fetch("http://127.0.0.1:8000/api/albums")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de barras
            createBarChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de álbumes:", error);
        });
}

function consultarBandasPorGenero() {
    fetch("http://127.0.0.1:8000/api/bands")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de pastel
            createPieChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de bandas:", error);
        });
}

function consultarBandasPorPais() {
    fetch("http://127.0.0.1:8000/api/bands")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de barras
            createBandsByCountryChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de bandas:", error);
        });
}

function consultarCantidadGeneros() {
    fetch("http://127.0.0.1:8000/api/genres")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de línea
            createGenreCountChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de generos:", error);
        });
}

function consultarConciertosPorLugar() {
    fetch("http://127.0.0.1:8000/api/concerts")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de barras
            createConcertsByLocationChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de conciertos:", error);
        });
}

function consultarAlbumesPorDecada() {
    fetch("http://127.0.0.1:8000/api/albums")
        .then((response) => response.json())
        .then((data) => {
            // Llamar a la función para crear la gráfica de barras
            createAlbumsByDecadesChart(data);
        })
        .catch((error) => {
            console.error("Error al obtener datos de álbumes:", error);
        });
}

  // Función para crear la gráfica de barras
function createBarChart(stats) {
    const statLabels = stats.map((stat) => stat.statName);
    const baseStats = stats.map((stat) => stat.base_stat);

    const data = [
        {
            x: statLabels,
            y: baseStats,
            type: "bar",
        },
    ];

    const layout = {
        title: "Gráfica de Barras",
        xaxis: {
            title: "Estadísticas",
        },
        yaxis: {
            title: "Valor",
        },
    };

    Plotly.newPlot("chart1", data, layout);
}

  // Función para crear la gráfica de pastel
function createPieChart(types) {
    const typeLabels = types.map((type) => type.genreName);

    const data = [
        {
            labels: typeLabels,
            type: "pie",
        },
    ];

    const layout = {
        title: "Gráfica de Pastel",
    };

    Plotly.newPlot("chart2", data, layout);
}

  // Función para crear la gráfica de línea
function createLineChart(moves) {
    const moveNames = moves;
    const movePower = moves.map(() => Math.floor(Math.random() * 100) + 1);

    const data = [
        {
            x: moveNames,
            y: movePower,
            type: "line",
        },
    ];

    const layout = {
        title: "Gráfica de Línea",
        xaxis: {
            title: "Movimientos",
            },
        yaxis: {
            title: "Poder",
            },
    };

    Plotly.newPlot("chart3", data, layout);
}

  // Función para crear la gráfica de radar
function createRadarChart(stats) {
    const statLabels = stats.map((stat) => stat.statName);
    const baseStats = stats.map((stat) => stat.base_stat);

    const data = [
        {
        type: "scatterpolar",
        r: baseStats,
        theta: statLabels,
        fill: "toself",
        },
    ];

    const layout = {
        title: "Gráfica de Radar",
        polar: {
        radialaxis: {
            visible: true,
            range: [0, Math.max(...baseStats) + 20],
            },
        },
    };

    Plotly.newPlot("chart4", data, layout);
}

// Gráfica 1: Cantidad de copias vendidas por cada álbum
function createBarChart(albumsData) {
    const albumNames = albumsData.map((album) => album.name);
    const albumCopies = albumsData.map((album) => album.copies_sold);

    const data = [{
        x: albumNames,
        y: albumCopies,
        type: "bar",
        marker: { color: "rgba(0, 0, 255)" }
    }];

    const layout = { title: "Cantidad de Copias Vendidas por Álbum" };

    Plotly.newPlot("albumCopiesChart", data, layout);
}

// Gráfica 2: Bandas por género
function createPieChart(bandsData) {
    const genres = bandsData.map((band) => band.type.genreName);
    const bandCounts = bandsData.map((band) => band.band_count);

    const data = [{
        labels: genres,
        values: bandCounts,
        type: "pie"
    }];

    const layout = { title: "Bandas por Género" };

    Plotly.newPlot("bandsByGenreChart", data, layout);
}

// Gráfica 3: Bandas por países
function createBandsByCountryChart(bandsData) {
    const countries = bandsData.map((band) => band.country);
    const bandCountsByCountry = countries.reduce((acc, country) => {
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    const data = [{
        x: Object.keys(bandCountsByCountry),
        y: Object.values(bandCountsByCountry),
        type: "bar",
        marker: { color: "rgba(255, 0, 0, 0.6)" }
    }];

    const layout = { title: "Bandas por Países" };

    Plotly.newPlot("bandsByCountryChart", data, layout);
}

// Gráfica 4: Cantidad de géneros musicales
function createGenreCountChart() {
    const genreCount = bandTypes.length;

    const data = [
        {
            labels: ["Total"],
            values: [genreCount],
            type: "pie",
        },
    ];

    const layout = {
        title: "Cantidad de Géneros Musicales",
    };

    Plotly.newPlot("genreCountChart", data, layout);
}

// Gráfica 5: Conciertos por cada lugar en el que se realizó
function createConcertsByLocationChart(concertsData) {
    const locations = concertsData.map((concert) => concert.location);
    const concertCountsByLocation = locations.reduce((acc, location) => {
        acc[location] = (acc[location] || 0) + 1;
        return acc;
    }, {});

    const data = [
        {
            x: Object.keys(concertCountsByLocation),
            y: Object.values(concertCountsByLocation),
            type: "bar",
            marker: { color: "rgba(0, 255, 0)" },
        },
    ];

    const layout = { title: "Conciertos por cada lugar en el que se realizó" };

    Plotly.newPlot("concertsByLocationChart", data, layout);
}

// Gráfica 6: Álbumes por décadas
function createAlbumsByDecadesChart(albumsData) {
    // Agrupar los álbumes por décadas
    const albumsByDecades = albumsData.reduce((acc, album) => {
        const decade = getDecadeFromYear(album.releaseYear); 
        acc[decade] = (acc[decade] || 0) + 1;
        return acc;
    }, {});

    const decades = Object.keys(albumsByDecades);
    const albumCounts = Object.values(albumsByDecades);

    const data = [
        {
            x: decades,
            y: albumCounts,
            type: "bar",
            marker: { color: "rgba(255, 165, 0, 0.6)" },
        },
    ];

    const layout = { title: "Álbumes por décadas" };

    Plotly.newPlot("albumsByDecadesChart", data, layout);
}

// Función auxiliar para obtener la década a partir del año del álbum
function getDecadeFromYear(year) {
    return `${Math.floor(year / 10) * 10}'s`;
}

// Datos para las gráficas
const bandStats = [
    { stat: { statName: "Popularidad" }, base_stat: 80 },
    { stat: { statName: "Ventas" }, base_stat: 90 },
    { stat: { statName: "Popularidad" }, base_stat: 70 },
];

const bandTypes = [
    { type: { genreName: "Rock" } },
    { type: { genreName: "Pop" } },
    { type: { genreName: "Jazz" } },
];

const bandSongs = [
    "Canción 1",
    "Canción 2",
    "Canción 3",
];

const bandRadarStats = [
    { stat: { statName: "Popularidad" }, base_stat: 80 },
    { stat: { statName: "Ventas" }, base_stat: 90 },
    { stat: { statName: "Reproducciones" }, base_stat: 70 },
    { stat: { statName: "Seguidores" }, base_stat: 85 },
    { stat: { statName: "Premios" }, base_stat: 60 },
];

createBarChart(albumsData);
createPieChart(bandsData);
createLineChart(bandSongs);
createRadarChart(bandRadarStats);
createGenreCountChart();
createConcertsByLocationChart(concertsData);
createAlbumsByDecadesChart(albumsData);
</script>
