"use strict";

/* ## Construir un pokedex https://pokeapi.co/

-   Consultar documentación https://pokeapi.co/docs/v2.html#
-   Listar pokemones, y poder cambiar de página
-   Ver detalles de 1 pokemón, incluyendo al menos 1 foto.
*/

function listarPokemones() {
	const APIpokemones = "https://pokeapi.co/api/v2/pokemon/?limit=1118";

	return fetch(APIpokemones)
		.then((lista20Pokemones) => lista20Pokemones.json())

		.catch((error) =>
			console.error(
				"falló cargar la lista de pokemones, intente nuevamente",
				error
			)
		);
}

function inicializar() {
	listarPokemones().then((informacionDePokemones) => {
		armarDatalist(informacionDePokemones.results);
	});
}

inicializar();

document
	.querySelector("#boton-ver-detalles")
	.addEventListener("click", function () {
		const pokemonSeleccionado = document.querySelector("#selector-pokemon")
			.value;
		const urlPokemonSeleccionado = document
			.querySelector(`#lista-pokemones [value="${pokemonSeleccionado}"]`)
			.getAttribute("data-url");
		obtenerDatosParaTarjeta(urlPokemonSeleccionado).then(
			(infoJSONDelPokemon) => {
				mostrarPropiedadesPokemon(infoJSONDelPokemon);
			}
		);
	});

function armarDatalist(infoPokemones) {
	infoPokemones.forEach(($pokemon) => {
		let $listaDePokemones = document.querySelector("#lista-pokemones");
		let option = document.createElement("option");
		option.value = $pokemon.name;
		option.dataset.url = $pokemon.url;
		$listaDePokemones.append(option);
	});
}

function obtenerDatosParaTarjeta(urlDelPokemon) {
	return fetch(urlDelPokemon)
		.then((specsDelPokemon) => specsDelPokemon.json())

		.catch((error) =>
			console.error("falló cargar el pokemon, intente nuevamente", error)
		);
}

function mostrarPropiedadesPokemon(datosJSONDelPokemon) {
	limpiarCampos();
	let $tarjetaInfoPokemon = document.querySelector("#info-tarjeta");
	console.log(datosJSONDelPokemon);
	let $imagenDelPokemon = document.querySelector("#imagen-pokemon");
	let urlImagenPokemon = datosJSONDelPokemon.sprites.front_default;
	$imagenDelPokemon.src = urlImagenPokemon;
	let nombre = document.createElement("p");
	nombre.class = "card-text";
	nombre.innerText = `Nombre: ${datosJSONDelPokemon.name}`;
	$tarjetaInfoPokemon.append(nombre);
	console.log(datosJSONDelPokemon.types);
	mostrarTipos(datosJSONDelPokemon.types);
	mostrarHabilidades(datosJSONDelPokemon.abilities);
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
		pokemonSpec.append(` ${habilidades.ability.name} `);
	});
	$tarjetaInfoPokemon.append(pokemonSpec);
}

function limpiarCampos() {
	document.querySelector("#info-tarjeta").innerHTML = "";
	document.querySelector("#selector-pokemon").value = "";
	//inputDatalist
}
