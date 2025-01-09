<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

// Formatear el ID del Pokémon
const formattedId = (pokemon) => pokemon.toString().padStart(3, '0');

// Capitalizar el nombre del Pokémon
const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const typeColors = {
  grass: '#78C850',
  poison: '#A040A0',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

</script>

<template>
  <div class="card">
    <!-- Imagen del Pokémon -->
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />

    <!-- Número del Pokémon -->
    <p class="pokemon-id">#{{ formattedId(pokemon.id) }}</p>

    <!-- Nombre del Pokémon -->
    <h3 class="pokemon-name">{{ capitalizeName(pokemon.name) }}</h3>

    <!-- Tipos del Pokémon -->
    <div class="pokemon-types">
      <span
        v-for="(type, index) in pokemon.types"
        :key="index"
        class="type"
        :style="{ backgroundColor: typeColors[type] }"
      >
        {{ capitalizeName(type) }}
      </span>
      


    </div>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.03);
}

.pokemon-image {
  width: 100%;
  height: auto;
  background-color: #F2F2F2;
}

.pokemon-id {
  font-size: 0.8em;
  color: #919191;
}

.pokemon-name {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

pokemon-types {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  
  flex-wrap: wrap;
}

.type {
  display: inline-block;
  background-color: #eee;
  border-radius: 5px;
  padding: 3px 25px;
  font-size: 0.8em;
  color: #555;
  text-transform: capitalize; /* Asegurar que los tipos estén capitalizados */
  margin-right: 2px;
  margin-bottom: 2px;
}
</style>
