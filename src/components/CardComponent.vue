<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

// Formatear el ID del Pokémon
const formattedId = (id) => id.toString().padStart(3, '0');

// Capitalizar el nombre del Pokémon
const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const typeColors = {
  bug: "#63953e", // Bicho
  dragon: ["#53A4CF", "#F16E57"], // Dragón
  fairy: "#FDB9E9", // Hada
  fire: "#f77031", // Fuego
  ghost: "#7B62A3", // Fantasma
  ground: ["#F7DE3F", "#AB9842"], // Tierra
  normal: "#b5b0af", // Normal
  psychic: "#F366B9", // Psíquico
  steel: "#9EB7B8", // Acero
  dark: "#707070", // Siniestro
  electric: "#EED535", // Eléctrico
  fighting: "#D56723", // Lucha
  flying: ["#3bc0e9", "#b5b0af"], // Volador
  grass: "#8dc651", // Planta
  ice: "#51C4E7", // Hielo
  poison: "#b373bf", // Veneno
  rock: "#A38C21", // Roca
  water: "#3587ba", // Agua
};

function typeStyle(type) {
  const color = typeColors[type];
  if (Array.isArray(color)) {
    return { background: `linear-gradient(to bottom, ${color[0]} 50%, ${color[1]} 50%)` };
  } else {
    return { backgroundColor: color };
  }
}

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
        :style="typeStyle(type)"
        
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
  color: #000000;
  text-transform: capitalize; /* Asegurar que los tipos estén capitalizados */
  margin-right: 2px;
  margin-bottom: 2px;
}
</style>
