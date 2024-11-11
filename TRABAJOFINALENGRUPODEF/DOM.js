// Botones dinámicos
let botonCategorias = document.getElementById('categorias');

botonCategorias.addEventListener('click', () => {
    let section = document.getElementsByClassName('contenedor-div')[0];

    if (encabezado.style.overflow === 'visible') {
        section.style.overflow = 'hidden';
    } else {
        section.style.overflow = 'visible';
        section.style.zIndex = '100';
    }
});

// Eventos en los botones de categoría, excluyendo "Todas las peliculas"
document.querySelectorAll('.button-aside').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.innerText;
        if (category !== "Todas las peliculas") {
            displayCategoryContent(category);
        }
    });
});

if (window.matchMedia("(min-width: 1258px)").matches) {
    let tituloAsidePeli = document.getElementsByClassName('titulo-aside-peliculas')[0];

    tituloAsidePeli.addEventListener('click', () => {
        let ulPelis = document.getElementsByClassName('ul-peliculas')[0];
        ulPelis.style.display = ulPelis.style.display === 'flex' ? 'none' : 'flex';
    });

    let tituloAsideSeries = document.getElementsByClassName('titulo-aside-series')[0];

    tituloAsideSeries.addEventListener('click', () => {
        let ulSeries = document.getElementsByClassName('ul-series')[0];
        ulSeries.style.display = ulSeries.style.display === 'flex' ? 'none' : 'flex';
    });

    let tituloAsideAnime = document.getElementsByClassName('titulo-aside-animes')[0];

    tituloAsideAnime.addEventListener('click', () => {
        let ulAnime = document.getElementsByClassName('ul-animes')[0];
        ulAnime.style.display = ulAnime.style.display === 'flex' ? 'none' : 'flex';
    });

    let tituloAsideDocu = document.getElementsByClassName('titulo-aside-documentales')[0];

    tituloAsideDocu.addEventListener('click', () => {
        let ulDocu = document.getElementsByClassName('ul-documentales')[0];
        ulDocu.style.display = ulDocu.style.display === 'flex' ? 'none' : 'flex';
    });

    let tituloAsideNovela = document.getElementsByClassName('titulo-aside-novelas')[0];

    tituloAsideNovela.addEventListener('click', () => {
        let ulNovela = document.getElementsByClassName('ul-novelas')[0];
        ulNovela.style.display = ulNovela.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Asocia los botones del aside a la carga de contenido
document.querySelectorAll('.button-aside').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.innerText;
        if (category !== "Todas las peliculas") {
            displayCategoryContent(category);
        }
    });
});

function displayCategoryContent(category) {
    // Busca el contenedor principal 'article' en el cual están los 'movie-row' específicos por categoría
    const articleContainer = document.querySelector('article');

    // Limpia la sección correspondiente
    const categoryContainer = document.querySelector(`#contenedor-${category.toLowerCase()}`);
    categoryContainer.innerHTML = '';

    // Genera contenido dinámico para cada película, serie, o documental
    const items = JSON.parse(localStorage.getItem(`items_${category.toLowerCase()}`)) || [];
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add("padre-imagen");
        itemDiv.innerHTML = `
            <img class="imagen" src="${item.imagen}" alt="${item.titulo}">
            <p class="titulo_peli">${item.titulo}</p>
            <div class="estrellita_puntaje">
                <p>${item.puntaje}</p>
                <img class="estrellita" src="imagenes/png-transparent-file-formats-lossless-compression-star-element-angle-web-design-symmetry-thumbnail.png">
            </div>
        `;
        categoryContainer.appendChild(itemDiv);
    });
}

// Cargar contenido inicial desde el LocalStorage al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasPorCategoria('terror', 'contenedor-terror');
    cargarPeliculasPorCategoria('drama', 'contenedor-drama');
    cargarPeliculasPorCategoria('comedia', 'contenedor-comedia');
    cargarPeliculasPorCategoria('accion', 'contenedor-accion');
    cargarPeliculasPorCategoria('romanticas', 'contenedor-romanticas');
    cargarPeliculasPorCategoria('aventura', 'contenedor-aventura');
    cargarPeliculasPorCategoria('ficcion', 'contenedor-ficcion');
});

// Cargar películas en el HTML dinámicamente
function cargarPeliculasPorCategoria(categoria, contenedorId) {
    const peliculas = JSON.parse(localStorage.getItem(`peliculas_${categoria}`)) || [];
    const contenedorPeliculas = document.querySelector(`#${contenedorId}`);

    contenedorPeliculas.innerHTML = ""; // Limpia el contenedor antes de cargar

    peliculas.forEach(pelicula => {
        const cajaPelicula = document.createElement("div");
        cajaPelicula.classList.add("padre-imagen");

        cajaPelicula.innerHTML = `
            <img class="imagen" src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <p class="titulo_peli">${pelicula.titulo}</p>
            <div class="estrellita_puntaje">
                <p>${pelicula.puntaje}</p>
                <img class="estrellita" src="estrellita/WhatsApp Image 2024-11-11 at 11.52.43.jpeg">
            </div>
        `;

        contenedorPeliculas.appendChild(cajaPelicula);
    });
}

cargarPeliculasPorCategoria('terror', 'contenedor-terror');
cargarPeliculasPorCategoria('drama', 'contenedor-drama');
cargarPeliculasPorCategoria('comedia', 'contenedor-comedia');
cargarPeliculasPorCategoria('accion', 'contenedor-accion');
cargarPeliculasPorCategoria('romanticas', 'contenedor-romanticas');
cargarPeliculasPorCategoria('aventura', 'contenedor-aventura');
cargarPeliculasPorCategoria('ficcion', 'contenedor-ficcion');

// Desplazamiento
document.querySelectorAll('.movie-row').forEach(row => {
    const contenedorPeliculas = row.querySelector('.contenedor-peliculas');
    const botonIzquierda = row.querySelector('.desplazar-izquierda');
    const botonDerecha = row.querySelector('.desplazar-derecha');

    let desplazamiento = 0;
    const card = contenedorPeliculas.children[0];
    const cardWidth = card ? card.offsetWidth + 40 : 0; // Ajustado con margen adicional

    botonIzquierda.addEventListener('click', () => {
        desplazamiento = Math.max(desplazamiento - cardWidth, 0);
        contenedorPeliculas.style.transform = `translateX(-${desplazamiento}px)`;
    });

    botonDerecha.addEventListener('click', () => {
        const maxDesplazamiento = contenedorPeliculas.scrollWidth - contenedorPeliculas.clientWidth;
        desplazamiento = Math.min(desplazamiento + cardWidth, maxDesplazamiento);
        contenedorPeliculas.style.transform = `translateX(-${desplazamiento}px)`;
    });
});

// JSON
if (!localStorage.getItem("peliculas_terror")) {
    const peliculasTerror = [
        {
            id: 1,
            titulo: "The Conjuring",
            puntaje: "8/10",
            imagen: "peliculas/elConjuro.jpg"
        },
        {
            id: 2,
            titulo: "Hereditary",
            puntaje: "7.5/10",
            imagen: "peliculas/hereditary.jpg"
        },
        {
            id: 3,
            titulo: "No Respires",
            puntaje: "8/10",
            imagen: "peliculas/noRespires.jpg"
        },
        {
            id: 4,
            titulo: "IT",
            puntaje: "6/10",
            imagen: "peliculas/it.jpg"
        },
        {
            id: 5,
            titulo: "El Exorsista",
            puntaje: "7.4/10",
            imagen: "peliculas/elExorsista.jpg"
        },
        {
            id: 6,
            titulo: "Pesadilla En la calle Elm",
            puntaje: "8/10",
            imagen: "peliculas/pesadillaEnLaCalleElm.jpg"
        },
        {
            id: 7,
            titulo: "El juego del miedo",
            puntaje: "8/10",
            imagen: "peliculas/elJuegoDelMiedo.jpg"
        },
        {
            id: 8,
            titulo: "El resplandor",
            puntaje: "8/10",
            imagen: "peliculas/elResplandor.jpg"
        }
    ];
    localStorage.setItem("peliculas_terror", JSON.stringify(peliculasTerror));
}

if (!localStorage.getItem("peliculas_drama")) {
    const peliculasDrama = [
        {
            id: 1,
            titulo: "The Shawshank Redemption",
            puntaje: "9/10",
            imagen: "peliculas/TheShawshanRedemption.jpg"
        },
        {
            id: 2,
            titulo: "Forest Gump",
            puntaje: "8.8/10",
            imagen: "peliculas/forestGump.jpg"
        },
        {
            id: 3,
            titulo: "La vida es bella",
            puntaje: "9/10",
            imagen: "peliculas/laVidaEsBella.jpg"
        },
        {
            id: 4,
            titulo: "Ciudad de Dios",
            puntaje: "8.4/10",
            imagen: "peliculas/ciudadDeDIos.jpg"
        },
        {
            id: 5,
            titulo: "El pianista",
            puntaje: "9/10",
            imagen: "peliculas/elPianista.jpg"
        },
        {
            id: 6,
            titulo: "Cinema Paradiso",
            puntaje: "9/10",
            imagen: "peliculas/cinemaParadiso.jpg"
        },
        {
            id: 7,
            titulo: "La lista de Schindler",
            puntaje: "9/10",
            imagen: "peliculas/laListaDeSchinders.jpg"
        },
        {
            id: 8,
            titulo: "Tiempos Violentos",
            puntaje: "9/10",
            imagen: "peliculas/tiemposViolentos.jpg"
        }
    ];
    localStorage.setItem("peliculas_drama", JSON.stringify(peliculasDrama));
}

if (!localStorage.getItem("peliculas_comedia")) {
    const peliculasComedia = [
        {
            id: 1,
            titulo: "The Hangover: part II",
            puntaje: "5/10",
            imagen: "peliculas/TheHangover.jpg"
        },
        {
            id: 2,
            titulo: "Supercool",
            puntaje: "8.8/10",
            imagen: "peliculas/supercool.jpg"
        },
        {
            id: 3,
            titulo: "Zoolander",
            puntaje: "9/10",
            imagen: "peliculas/zoolander.jpg"
        },
        {
            id: 4,
            titulo: "American Pie II",
            puntaje: "9/10",
            imagen: "peliculas/americanPie.jpg"
        },
        {
            id: 5,
            titulo: "How High",
            puntaje: "9/10",
            imagen: "peliculas/howHigh.jpg"
        },
        {
            id: 6,
            titulo: "Grown Ups",
            puntaje: "9/10",
            imagen: "peliculas/grownUps.jpg"
        },
        {
            id: 7,
            titulo: "Donde estan las rubias",
            puntaje: "9/10",
            imagen: "peliculas/dondeEstanLasRubias.jpg"
        },
        {
            id: 8,
            titulo: "Los Fockers",
            puntaje: "9/10",
            imagen: "peliculas/losFockers.jpg"
        }
        
    ];
    localStorage.setItem("peliculas_comedia", JSON.stringify(peliculasComedia));
}

if (!localStorage.getItem("peliculas_accion")) {
    const peliculasAccion = [
        {
            id: 1,
            titulo: "Kill Bill",
            puntaje: "9/10",
            imagen: "peliculas/kill bill.jpg"
        },
        {
            id: 2,
            titulo: "Arma letal",
            puntaje: "8.8/10",
            imagen: "peliculas/armaLetal.jpg"
        },
        {
            id: 3,
            titulo: "Mision Imposible",
            puntaje: "9/10",
            imagen: "peliculas/mision imposible.jpg"
        },
        {
            id: 4,
            titulo: "Rambo",
            puntaje: "9/10",
            imagen: "peliculas/rambo.jpg"
        },
        {
            id: 5,
            titulo: "Predator",
            puntaje: "9/10",
            imagen: "peliculas/predator.jpg"
        },
        {
            id: 6,
            titulo: "Enter the Dragon",
            puntaje: "9/10",
            imagen: "peliculas/enterTheDragon.jpg"
        },
        {
            id: 7,
            titulo: "The Warriors",
            puntaje: "9/10",
            imagen: "peliculas/theWarrior.jpg"
        },
        {
            id: 8,
            titulo: "Perros de la calle",
            puntaje: "9/10",
            imagen: "peliculas/perrosDeLaCalle.jpg"
        }
        
    ];
    localStorage.setItem("peliculas_accion", JSON.stringify(peliculasAccion));
}

if (!localStorage.getItem("peliculas_romanticas")) {
    const peliculasRomanticas = [
        {
            id: 1,
            titulo: "La Propuesta",
            puntaje: "9/10",
            imagen: "peliculas/laPropuesta_romanticas.jpg"
        },
        {
            id: 2,
            titulo: "Yo antes de ti",
            puntaje: "8.8/10",
            imagen: "peliculas/yoAntesDeTi_romanticas.jpg"
        },
        {
            id: 3,
            titulo: "Votos de amor",
            puntaje: "9/10",
            imagen: "peliculas/votosDeAmor_romanticas.jpg"
        },
        {
            id: 4,
            titulo: "Mujer Bonita",
            puntaje: "9/10",
            imagen: "peliculas/mujerBonita_romantica.jpg"
        },
        {
            id: 5,
            titulo: "Diario de una Pasion",
            puntaje: "9/10",
            imagen: "peliculas/diarioDeUnaPasion_romanticas.jpg"
        },
        {
            id: 6,
            titulo: "500 dias con ella",
            puntaje: "9/10",
            imagen: "peliculas/500DiasConElla.jpg"
        },
        {
            id: 7,
            titulo: "Mejor Imposible",
            puntaje: "9/10",
            imagen: "peliculas/mejorImposible_romantica.jpg"
        },
        {
            id: 8,
            titulo: "Mamma Mia",
            puntaje: "9/10",
            imagen: "peliculas/mammaMia_romantica.jpg"
        }
        
    ];
    localStorage.setItem("peliculas_romanticas", JSON.stringify(peliculasRomanticas));
}

if (!localStorage.getItem("peliculas_aventura")) {
    const peliculasAventura = [
        {
            id: 1,
            titulo: "Jumanji",
            puntaje: "7/10",
            imagen: "peliculas/jumanji.jpg"
        },
        {
            id: 2,
            titulo: "Piratas del Caribe",
            puntaje: "8.8/10",
            imagen: "peliculas/piratasDelCaribe_aventura.jpg"
        },
        {
            id: 3,
            titulo: "Zathura",
            puntaje: "9/10",
            imagen: "peliculas/zathura_aventura.jpg"
        },
        {
            id: 4,
            titulo: "300",
            puntaje: "9/10",
            imagen: "peliculas/300_aventura.jpg"
        },
        {
            id: 5,
            titulo: "Uncharted",
            puntaje: "9/10",
            imagen: "peliculas/uncharted_aventura.jpg"
        },
        {
            id: 6,
            titulo: "La momia",
            puntaje: "9/10",
            imagen: "peliculas/laMomia_aventura.jpg"
        },
        {
            id: 7,
            titulo: "Indiana Jones",
            puntaje: "9/10",
            imagen: "peliculas/indianaJones_aventura.jpg"
        },
        {
            id: 8,
            titulo: "Troya",
            puntaje: "9/10",
            imagen: "peliculas/Troya_aventura.jpg"
        }
        
    ];
    localStorage.setItem("peliculas_aventura", JSON.stringify(peliculasAventura));
}

if (!localStorage.getItem("peliculas_ficcion")) {
    const peliculasFiccion = [
        {
            id: 1,
            titulo: "Volver al Futuro",
            puntaje: "9/10",
            imagen: "peliculas/volverAlFuturo.jpg"
        },
        {
            id: 2,
            titulo: "X-Men",
            puntaje: "8.8/10",
            imagen: "peliculas/X-men.jpg"
        },
        {
            id: 3,
            titulo: "Harry Potter",
            puntaje: "9/10",
            imagen: "peliculas/harryPotter.jpg"
        },
        {
            id: 4,
            titulo: "El señor de los anillos",
            puntaje: "9/10",
            imagen: "peliculas/ElSeñorDeLosAnillos.jpg"
        },
        {
            id: 5,
            titulo: "E.T",
            puntaje: "9/10",
            imagen: "peliculas/ET.jpg"
        },
        {
            id: 6,
            titulo: "Hellboy",
            puntaje: "9/10",
            imagen: "peliculas/hellboy.jpg"
        },
        {
            id: 7,
            titulo: "Avatar",
            puntaje: "9/10",
            imagen: "peliculas/avatar.jpg"
        },
        {
            id: 8,
            titulo: "Interestelar",
            puntaje: "9/10",
            imagen: "peliculas/interestelar.jpg"
        }
    ];
    localStorage.setItem("peliculas_ficcion", JSON.stringify(peliculasFiccion));
}

if (!localStorage.getItem("todas_las_series")) {
    const todas_las_series = [
        {
            id: 1,
            titulo: "Friends",
            puntaje: "9/10",
            imagen: "series/friends.jpg"
        },
        {
            id: 2,
            titulo: "Lost",
            puntaje: "7.5/10",
            imagen: "series/lost.jpg"
        },
        {
            id: 3,
            titulo: "Merli",
            puntaje: "8/10",
            imagen: "series/merli.jpg"
        },
        {
            id: 4,
            titulo: "El Encargado",
            puntaje: "6/10",
            imagen: "series/elEncargado.jpg"
        },
        {
            id: 5,
            titulo: "Better Call Saul",
            puntaje: "7.4/10",
            imagen: "series/betterCallSaul.jpg"
        },
        {
            id: 6,
            titulo: "Breaking Bad",
            puntaje: "8/10",
            imagen: "series/breakingBad.jpg"
        },
        {
            id: 7,
            titulo: "Brooklyn nine-nine",
            puntaje: "8/10",
            imagen: "series/broklinNineNine.jpg"
        },
        {
            id: 8,
            titulo: "Dark",
            puntaje: "8/10",
            imagen: "series/dark.jpg"
        },
        {
            id: 9,
            titulo: "Elite",
            puntaje: "9/10",
            imagen: "series/elite.jpg"
        },
        {
            id: 10,
            titulo: "El marginal",
            puntaje: "8.8/10",
            imagen: "series/elMarginal.jpg"
        },
        {
            id: 11,
            titulo: "Grays Anatomy",
            puntaje: "9/10",
            imagen: "series/graysAnatomy.jpg"
        },
        {
            id: 12,
            titulo: "La casa de Papel",
            puntaje: "8.4/10",
            imagen: "series/laCasaDePapel.jpg"
        },
        {
            id: 13,
            titulo: "Los Simuladores",
            puntaje: "9/10",
            imagen: "series/losSimuladores.jpg"
        },
        {
            id: 14,
            titulo: "Only murders in the building",
            puntaje: "9/10",
            imagen: "series/onyMurdersInTheBuilding.jpg"
        },
        {
            id: 15,
            titulo: "Outer Banks",
            puntaje: "9/10",
            imagen: "series/outerBanks.jpg"
        },
        {
            id: 16,
            titulo: "OZ",
            puntaje: "9/10",
            imagen: "series/oz.jpg"
        },
        {
            id: 17,
            titulo: "Peaky Blinders",
            puntaje: "5/10",
            imagen: "series/peakyBlinders.jpg"
        },
        {
            id: 18,
            titulo: "Prison Break",
            puntaje: "8.8/10",
            imagen: "series/prisonBreak.jpg"
        },
        {
            id: 19,
            titulo: "Strangers Things",
            puntaje: "9/10",
            imagen: "series/strangersThings.jpg"
        },
        {
            id: 20,
            titulo: "The boys",
            puntaje: "9/10",
            imagen: "series/theBoys.jpg"
        },
        {
            id: 21,
            titulo: "The Flash",
            puntaje: "9/10",
            imagen: "series/theFlash.jpg"
        },
        {
            id: 22,
            titulo: "The society",
            puntaje: "9/10",
            imagen: "series/theSociety.jpg"
        },
        {
            id: 23,
            titulo: "The Umbrella Academy",
            puntaje: "9/10",
            imagen: "series/theUmbrellaAcademy.jpg"
        },
        {
            id: 24,
            titulo: "Trinkets",
            puntaje: "9/10",
            imagen: "series/trinkets.jpg"
        }
    ];
    localStorage.setItem("series", JSON.stringify(todas_las_series));
}
