import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", () => {
  const allPokemons = ref([]);
  const visiblePokemons = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const offset = ref(0);
  const limit = 12; // Pokémon por página
  const sortOption = ref("default"); // Opción de ordenamiento

  // Cargar Pokémon
  async function fetchPokemons() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: { limit: 1025, offset: 0 },
      });

      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            types: details.data.types.map((typeInfo) => typeInfo.type.name),
            image: details.data.sprites.other["official-artwork"].front_default,
          };
        })
      );

      allPokemons.value = pokemonData;
      loadMorePokemons();
    } catch (err) {
      error.value = "Error al cargar los Pokémon";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Cargar más Pokémon
  function loadMorePokemons() {
    const nextPokemons = allPokemons.value.slice(
      offset.value,
      offset.value + limit
    );
    visiblePokemons.value = [...visiblePokemons.value, ...nextPokemons];
    offset.value += limit;
  }

  // Función para mezclar Pokémon
  function shufflePokemons() {
    isLoading.value = true;
    try {
      allPokemons.value.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
      visiblePokemons.value = allPokemons.value.slice(0, offset.value); // Actualizar los visibles
      sortOption.value = "default"; // Cambiar la opción a "default"
    } finally {
      isLoading.value = false; // Desactivar el spinner
    }
  }

  // Función para ordenar Pokémon
  function sortPokemons() {
    isLoading.value = true;
    try {
      if (sortOption.value === "lowest") {
        allPokemons.value.sort((a, b) => a.id - b.id);
      } else if (sortOption.value === "highest") {
        allPokemons.value.sort((a, b) => b.id - a.id);
      } else if (sortOption.value === "az") {
        allPokemons.value.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption.value === "za") {
        allPokemons.value.sort((a, b) => b.name.localeCompare(a.name));
      }

      // Actualizar los Pokémon visibles después de ordenar
      visiblePokemons.value = allPokemons.value.slice(0, offset.value);
    } finally {
      isLoading.value = false; // Desactivar el spinner
    }
  }


  return {
    allPokemons,
    visiblePokemons,
    isLoading,
    error,
    fetchPokemons,
    loadMorePokemons,
    shufflePokemons,
    sortPokemons,
    sortOption,
  };
});