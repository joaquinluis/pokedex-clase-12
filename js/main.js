let contadorPaginas = 1;
const numeroDePagina = document.querySelector('#numero-de-pagina');
async function listarPokemones(APIpokemones) {
  try {
    const lista20Pokemones = await fetch(APIpokemones);
    return await lista20Pokemones.json();
  } catch (error) {
    return console.error(
      'falló cargar la lista de pokemones, intente nuevamente',
      // eslint-disable-next-line comma-dangle
      error
    );
  }
}

async function obtenerDatosParaTarjeta(urlDelPokemon) {
  try {
    const specsDelPokemon = await fetch(urlDelPokemon);
    return await specsDelPokemon.json();
  } catch (error) {
    return console.error('falló cargar el pokemon, intente nuevamente', error);
  }
}
function mostrarPropiedadesPokemon(datosJSONDelPokemon) {
  const $tarjetaInfoPokemon = document.querySelector('#info-tarjeta');
  limpiarElemento($tarjetaInfoPokemon);
  const $imagenDelPokemon = document.querySelector('#imagen-pokemon');
  const urlImagenPokemon = mostrarImagen(datosJSONDelPokemon);
  $imagenDelPokemon.src = urlImagenPokemon;
  const nombre = document.createElement('p');
  nombre.class = 'card-text';
  nombre.innerText = `Nombre: ${datosJSONDelPokemon.name}`;
  $tarjetaInfoPokemon.append(nombre);
  const id = document.createElement('p');
  id.class = 'card-text';
  id.innerText = `ID: ${datosJSONDelPokemon.id}`;
  $tarjetaInfoPokemon.append(id);
  mostrarTipos(datosJSONDelPokemon.types);
  const peso = document.createElement('p');
  peso.class = 'card-text';
  peso.innerText = `Peso: ${datosJSONDelPokemon.weight}`;
  $tarjetaInfoPokemon.append(peso);
  const altura = document.createElement('p');
  altura.class = 'card-text';
  altura.innerText = `Altura: ${datosJSONDelPokemon.height}`;
  $tarjetaInfoPokemon.append(altura);
  mostrarHabilidades(datosJSONDelPokemon.abilities);
}

function mostrarImagen(respuestaJSONDelPokemon) {
  if (respuestaJSONDelPokemon.sprites.other.dream_world.front_default == null) {
    return respuestaJSONDelPokemon.sprites.front_default;
  }
  return respuestaJSONDelPokemon.sprites.other.dream_world.front_default;
}

function mostrarTipos(arrayDeTipos) {
  const $tarjetaInfoPokemon = document.querySelector('#info-tarjeta');
  const pokemonSpec = document.createElement('p');
  pokemonSpec.class = 'card-text';
  pokemonSpec.innerText = 'tipo:';
  arrayDeTipos.forEach((tipos) => {
    pokemonSpec.append(` ${tipos.type.name} `);
  });
  $tarjetaInfoPokemon.append(pokemonSpec);
}
function mostrarHabilidades(arrayDeHabilidades) {
  const $tarjetaInfoPokemon = document.querySelector('#info-tarjeta');
  const pokemonSpec = document.createElement('p');
  pokemonSpec.class = 'card-text';
  pokemonSpec.innerText = 'Habilidades :';
  arrayDeHabilidades.forEach((habilidades) => {
    pokemonSpec.append(` "${habilidades.ability.name}" `);
  });
  $tarjetaInfoPokemon.append(pokemonSpec);
}

function limpiarElemento(elemento) {
  elemento.innerHTML = '';
}

function armarBotones(infoPokemon) {
  infoPokemon.forEach(($pokemon) => {
    const $listaDePokemones = document.querySelector('#botonera-pokemones');
    const option = document.createElement('button');
    option.value = $pokemon.name;
    option.innerText = $pokemon.name;
    option.id = $pokemon.name;
    option.style = 'margin: 10px';
    option.dataset.url = $pokemon.url;
    option.classList = 'botones btn btn-info ';
    $listaDePokemones.append(option);
    option.addEventListener('click', () => {
      const pokemonSeleccionado = document.querySelector(`#${option.id}`).value;
      const urlPokemonSeleccionado = document
        .querySelector(`#${pokemonSeleccionado}`)
        .getAttribute('data-url');
      armarTarjeta(urlPokemonSeleccionado);
    });
  });
}
function armarPagina(APIDepokemones) {
  listarPokemones(APIDepokemones).then((informacionDePokemones) => {
    armarBotones(informacionDePokemones.results);
    botonAnteriorYSiguiente(informacionDePokemones);
  });
}

function armarTarjeta(urlDelPokemon) {
  obtenerDatosParaTarjeta(urlDelPokemon).then((datosJSONDelPokemon) =>
    mostrarPropiedadesPokemon(datosJSONDelPokemon)
  );
}
function iniciarPagina(urlApiPokemon) {
  armarPagina(urlApiPokemon);
}
function botonAnteriorYSiguiente(respuestaJSON) {
  const botonAnterior = document.querySelector('#boton-anterior');
  if (respuestaJSON.previous === null) {
    botonAnterior.classList = 'oculto';
  }
  botonAnterior.onclick = function (e) {
    document.querySelector('#botonera-pokemones').innerHTML = '';
    armarPagina(respuestaJSON.previous);
    contadorPaginas -= 1;
    numeroDePagina.innerText = `Página ${contadorPaginas}`;
  };
  const botonSiguiente = document.querySelector('#boton-siguiente');
  if (respuestaJSON.next === null) {
    botonSiguiente.classList = 'oculto';
  }
  botonSiguiente.onclick = function (e) {
    document.querySelector('#botonera-pokemones').innerHTML = '';
    armarPagina(respuestaJSON.next);
    contadorPaginas += 1;
    numeroDePagina.innerText = `Página ${contadorPaginas}`;

    document.querySelector('#boton-anterior').classList =
      'float-left btn btn-success';
  };
}

iniciarPagina('https://pokeapi.co/api/v2/pokemon');
