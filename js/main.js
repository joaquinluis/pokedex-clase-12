"use strict";

/* ## Construir un pokedex https://pokeapi.co/

-   Consultar documentación https://pokeapi.co/docs/v2.html#
-   Listar pokemones, y poder cambiar de página
-   Ver detalles de 1 pokemón, incluyendo al menos 1 foto.
*/

function listarPokemones() {
	const APIpokemones = "https://pokeapi.co/api/v2/pokemon";

	return fetch(APIpokemones)
		.then((lista20Pokemones) => lista20Pokemones.json())

		.catch((error) =>
			console.console.error(
				"falló cargar la lista de pokemones, intente nuevamente",
				error
			)
		);
}

function inicializar() {
	listarPokemones().then((informacionDePokemones) => {
		armarBotones(informacionDePokemones.results);
	});
}

inicializar();

function armarBotones(infoPokemon) {
	infoPokemon.forEach(($pokemon) => {
		let $listaDePokemones = document.querySelector("#botonera-pokemones");
		let option = document.createElement("button");
		option.value = $pokemon.name;
		option.innerText = $pokemon.name;
		option.style = "margin: 10px";
		option.dataset.url = $pokemon.url;
		option.classList = "botones btn btn-primary ";
		$listaDePokemones.append(option);

		document.querySelectorAll(".botones").forEach((boton) => {
			boton.addEventListener("click", function () {
				console.log(`hicieron click en ${boton.value}`);
			});
		});
	});
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
