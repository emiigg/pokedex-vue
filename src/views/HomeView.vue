<script setup>
import { onMounted, watch} from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

import SpinnerComponent from '../components/SpinnerComponent.vue';
import PokeballSvg from '../assets/svg/pokeballSvg.vue';
import CardComponent from "../components/CardComponent.vue";

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.fetchPokemons();
});

// Reaccionar al cambio en sortOption
watch(() => pokemonStore.sortOption, () => {
  pokemonStore.sortPokemons();
});

watch(() => pokemonStore.isLoading, (newValue) => {
  console.log("isLoading cambió:", newValue); // Verifica que cambia correctamente
});
</script>

<template>

  <SpinnerComponent :show="pokemonStore.isLoading" />

  <div class="header-container">
    <div class="header">
      <div class="search-section">
        <h1>Name or Number</h1>
        <div class="search-container">
          <input type="text" class="input-search" />
          <button class="button-search">
            <svg
              class="search-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <p>Use the Advanced Search to explore Pokémon by type, weakness, Ability and more!</p>
      </div>
      <div class="information">
        <p>Search for a Pokemon By name or using its National Pokédex number.</p>
      </div>
    </div>
    <div class="advanced-search">
      <div class="shape-content">
        <span>Show Advanced Search</span>
        <svg
          class="down-arrow"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </div>
    </div>
    <div class="shape-container"></div>
  </div>

  <div class="filter-container">
    <div class="container">
      <button class="btn-surprise" @click="pokemonStore.shufflePokemons">
        <svg
          fill="#ffff"
          height="20px"
          width="20px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 489.698 489.698"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path
                  d="M468.999,227.774c-11.4,0-20.8,8.3-20.8,19.8c-1,74.9-44.2,142.6-110.3,178.9c-99.6,54.7-216,5.6-260.6-61l62.9,13.1 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-123.7-26c-7.2-1.7-26.1,3.5-23.9,22.9l15.6,124.8 c1,10.4,9.4,17.7,19.8,17.7c15.5,0,21.8-11.4,20.8-22.9l-7.3-60.9c101.1,121.3,229.4,104.4,306.8,69.3 c80.1-42.7,131.1-124.8,132.1-215.4C488.799,237.174,480.399,227.774,468.999,227.774z"
                ></path>
                <path
                  d="M20.599,261.874c11.4,0,20.8-8.3,20.8-19.8c1-74.9,44.2-142.6,110.3-178.9c99.6-54.7,216-5.6,260.6,61l-62.9-13.1 c-10.4-2.1-21.8,4.2-23.9,15.6c-2.1,10.4,4.2,21.8,15.6,23.9l123.8,26c7.2,1.7,26.1-3.5,23.9-22.9l-15.6-124.8 c-1-10.4-9.4-17.7-19.8-17.7c-15.5,0-21.8,11.4-20.8,22.9l7.2,60.9c-101.1-121.2-229.4-104.4-306.8-69.2 c-80.1,42.6-131.1,124.8-132.2,215.3C0.799,252.574,9.199,261.874,20.599,261.874z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        Surprise Me!
      </button>
      <div class="select-wrapper">
        <PokeballSvg />
        <select class="select-filter" v-model="pokemonStore.sortOption">
          <option value="default" disabled>Sort results by</option>
          <option value="lowest">Lowest Number (first)</option>
          <option value="highest">Highest Number (last)</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  </div>

  <div class="pokemon-grid">
    <CardComponent 
      v-for="pokemon in pokemonStore.visiblePokemons" :key="pokemon.id" :pokemon="pokemon" />
  </div>

  <!-- Botón de cargar más -->
  <div class="load-more-container">
    <button @click="pokemonStore.loadMorePokemons" class="btn-load-more">
      Load More Pokémon
    </button>
  </div>
</template>

<style>
/* ---- Header Section--- */
h1 {
  font-weight: normal;
  font-size: 25px;
  margin-inline-start: 0px;
}

.header-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: white;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 50px;
  padding: 30px;
  background-color: #2b2b2b;
}

.search-section {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 400px;
  gap: 10px;
}

.search-section p {
  font-size: small;
}

.search-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.input-search {
  width: 350px;
  height: 43px;
  border: #616161 solid 2px;
  border-radius: 5px;
  padding: 10px;
}

.button-search {
  padding: 10px;
  background-color: #f15e33;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-search:hover {
  background-color: #da481c;
}

.search-icon {
  color: white;
}

.information {
  background-color: #39a456;
  max-width: 400px;
  height: fit-content;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: larger;
}

/* ---- Filter Section--- */
.advanced-search {
  display: flex;
  background-color: #565656;
  height: 50px;
  position: relative;
  z-index: 1;
}

.shape-container {
  clip-path: polygon(15% 0, 85% 0, 83% 100%, 17% 100%);
  background-color: #565656;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 30%;
  height: 15px;
  margin: auto;
}

.shape-content {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;

  margin-top: 28px;
  font-size: small;
}

.down-arrow {
  color: #616161;
  background-color: #fff;
  border-radius: 100%;
  margin-left: 10px;
}

.filter-container {
  max-width: 850px;
  margin: 40px auto;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-surprise {
  width: 40%;
  background-color: #30a7d7;
  border: none;
  padding: 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.btn-surprise:hover {
  background-color: #1b82b1;
}

.select-filter {
  background-color: #313131;
  outline: none;
  width: 100%;
  padding: 10px 10px 10px 50px;
  font-size: 20px;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.select-filter:hover {
  background-color: #282828;
}

.select-wrapper {
  position: relative;
  width: 40%;
}

.pokemon-grid {
  display: grid; /* Usa un grid layout */
  grid-template-columns: repeat(4, 1fr); /* Define 4 columnas iguales */
  gap: 10px; /* Espaciado más pequeño entre las tarjetas */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra las tarjetas verticalmente */
  padding: 20px; /* Espaciado interno del grid */
  margin: 0 auto; /* Centra el grid en su contenedor padre */
  max-width: 900px; /* Opcional: limita el ancho máximo */
}

/* --- Load More Section --- */
.load-more-container {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  margin-top: 20px; /* Espaciado superior */
}

.btn-load-more {
  color: white; /* Texto blanco */
  font-size: 16px; /* Tamaño del texto */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Manito al pasar */
  transition: background-color 0.3s; /* Transición suave en el hover */
  background-color: #30a7d7;
  padding: 10px 20px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  
}

.btn-load-more:hover {
  background-color: #1b82b1; /* Azul más oscuro al pasar el ratón */
}

</style>
