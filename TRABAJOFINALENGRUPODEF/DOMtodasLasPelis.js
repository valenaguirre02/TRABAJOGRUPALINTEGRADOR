function cargarPeliculasPorCategoria(categoria, contenedorId) {
    const peliculas = JSON.parse(localStorage.getItem(`peliculas_${categoria}`)) || [];
    const contenedorPeliculas = document.querySelector(`#${contenedorId}`);

    contenedorPeliculas.innerHTML = ""; 

    peliculas.forEach(pelicula => {
        const cajaPelicula = document.createElement("div");
        cajaPelicula.classList.add("padre-imagen");

        cajaPelicula.innerHTML = `
            <img class="imagen" src="peliculas/${pelicula.imagen}.jpg" alt="${pelicula.titulo}">
            <p class="titulo_peli">${pelicula.titulo}</p>
            <div class="estrellita_puntaje">
                <p>${pelicula.puntaje}</p>
                <img class="estrellita" src="peliculas/png-transparent-file-formats-lossless-compression-star-element-angle-web-design-symmetry-thumbnail.png">
            </div>
        `;

        contenedorPeliculas.appendChild(cajaPelicula);
    });
}

// Cargar las películas por categoría
cargarPeliculasPorCategoria('terror', 'movie-row');
cargarPeliculasPorCategoria('drama', 'movie-row');
cargarPeliculasPorCategoria('comedia', 'movie-row');
cargarPeliculasPorCategoria('accion', 'movie-row');
cargarPeliculasPorCategoria('romanticas', 'movie-row');
cargarPeliculasPorCategoria('aventura', 'movie-row');
cargarPeliculasPorCategoria('ficcion', 'movie-row');
