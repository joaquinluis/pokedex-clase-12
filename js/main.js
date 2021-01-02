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
		armarDatalist(informacionDePokemones.results);
	});
}

inicializar();

function armarDatalist(infoPokemon) {
	console.log(infoPokemon);
	infoPokemon.forEach(($pokemon) => {
		let $listaDePokemones = document.querySelector("#lista-pokemones");
		let option = document.createElement("option");
		option.value = $pokemon.name;
		option.dataset.url = $pokemon.url;
		$listaDePokemones.append(option);
	});
}
