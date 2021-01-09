"use strict";

/* ## Construir un pokedex https://pokeapi.co/

-   Consultar documentación https://pokeapi.co/docs/v2.html#
-   Listar pokemones, y poder cambiar de página
-   Ver detalles de 1 pokemón, incluyendo al menos 1 foto.
*/

function listarPokemones(APIpokemones) {
	return fetch(APIpokemones)
		.then((lista20Pokemones) => lista20Pokemones.json())
		.catch((error) =>
			console.error(
				"falló cargar la lista de pokemones, intente nuevamente",
				error
			)
		);
}

function armarPagina(APIDepokemones) {
	listarPokemones(APIDepokemones).then(function (informacionDePokemones) {
		armarBotones(informacionDePokemones.results);
		botonSiguiente(informacionDePokemones);
		botonAnterior(informacionDePokemones);
	});
}

function armarBotones(infoPokemon) {
	infoPokemon.forEach(($pokemon) => {
		let $listaDePokemones = document.querySelector("#botonera-pokemones");
		let option = document.createElement("button");
		option.value = $pokemon.name;
		option.innerText = $pokemon.name;
		option.id = $pokemon.name;
		option.style = "margin: 10px";
		option.dataset.url = $pokemon.url;
		option.classList = "botones btn btn-info ";
		$listaDePokemones.append(option);
		option.addEventListener("click", function () {
			let pokemonSeleccionado = document.querySelector(`#${option.id}`)
				.value;
			const urlPokemonSeleccionado = document
				.querySelector(`#${pokemonSeleccionado}`)
				.getAttribute("data-url");
			armarTarjeta(urlPokemonSeleccionado);
		});
	});
}

function botonAnterior(respuestaJSON) {
	let botonAnterior = document.querySelector("#boton-anterior");
	if (respuestaJSON.previous === null) {
		botonAnterior.classList = "oculto";
	}
	botonAnterior.onclick = function (e) {
		document.querySelector("#botonera-pokemones").innerHTML = "";
		armarPagina(respuestaJSON.previous);
	};
}

function botonSiguiente(respuestaJSON) {
	let botonSiguiente = document.querySelector("#boton-siguiente");
	if (respuestaJSON.next === null) {
		botonSiguiente.classList = "oculto";
	}
	botonSiguiente.onclick = function (e) {
		document.querySelector("#botonera-pokemones").innerHTML = "";
		armarPagina(respuestaJSON.next);
		document.querySelector("#boton-anterior").classList =
			"float-left btn btn-success";
	};
}

function armarTarjeta(urlDelPokemon) {
	obtenerDatosParaTarjeta(urlDelPokemon).then((datosJSONDelPokemon) =>
		mostrarPropiedadesPokemon(datosJSONDelPokemon)
	);
}

function obtenerDatosParaTarjeta(urlDelPokemon) {
	return fetch(urlDelPokemon)
		.then((specsDelPokemon) => specsDelPokemon.json())

		.catch((error) =>
			console.error("falló cargar el pokemon, intente nuevamente", error)
		);
}

function mostrarPropiedadesPokemon(datosJSONDelPokemon) {
	let $tarjetaInfoPokemon = document.querySelector("#info-tarjeta");
	limpiarElemento($tarjetaInfoPokemon);
	let $imagenDelPokemon = document.querySelector("#imagen-pokemon");
	let urlImagenPokemon = mostrarImagen(datosJSONDelPokemon);
	$imagenDelPokemon.src = urlImagenPokemon;
	let nombre = document.createElement("p");
	nombre.class = "card-text";
	nombre.innerText = `Nombre: ${datosJSONDelPokemon.name}`;
	$tarjetaInfoPokemon.append(nombre);
	const id = document.createElement("p");
	id.class = "card-text";
	id.innerText = `ID: ${datosJSONDelPokemon.id}`;
	$tarjetaInfoPokemon.append(id);
	mostrarTipos(datosJSONDelPokemon.types);
	let peso = document.createElement("p");
	peso.class = "card-text";
	peso.innerText = `Peso: ${datosJSONDelPokemon.weight}`;
	$tarjetaInfoPokemon.append(peso);
	let altura = document.createElement("p");
	altura.class = "card-text";
	altura.innerText = `Altura: ${datosJSONDelPokemon.height}`;
	$tarjetaInfoPokemon.append(altura);
	mostrarHabilidades(datosJSONDelPokemon.abilities);
}

function mostrarImagen(respuestaJSONDelPokemon) {
	if (
		respuestaJSONDelPokemon.sprites.other.dream_world.front_default == null
	) {
		return respuestaJSONDelPokemon.sprites.front_default;
	} else {
		return respuestaJSONDelPokemon.sprites.other.dream_world.front_default;
	}
}

function mostrarTipos(arrayDeTipos) {
	let $tarjetaInfoPokemon = document.querySelector("#info-tarjeta");
	let pokemonSpec = document.createElement("p");
	pokemonSpec.class = "card-text";
	pokemonSpec.innerText = "tipo:";
	arrayDeTipos.forEach((tipos) => {
		pokemonSpec.append(` ${tipos.type.name} `);
	});
	$tarjetaInfoPokemon.append(pokemonSpec);
}

function mostrarHabilidades(arrayDeHabilidades) {
	let $tarjetaInfoPokemon = document.querySelector("#info-tarjeta");
	let pokemonSpec = document.createElement("p");
	pokemonSpec.class = "card-text";
	pokemonSpec.innerText = "Habilidades :";
	arrayDeHabilidades.forEach((habilidades) => {
		pokemonSpec.append(` "${habilidades.ability.name}" `);
	});
	$tarjetaInfoPokemon.append(pokemonSpec);
}

function limpiarElemento(elemnto) {
	elemnto.innerHTML = "";
}

function iniciarPagina(urlApiPokemon) {
	armarPagina(urlApiPokemon);
}

iniciarPagina("https://pokeapi.co/api/v2/pokemon");
