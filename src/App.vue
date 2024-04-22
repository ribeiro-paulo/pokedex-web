<script>
import { getAllPokemons } from "./service/pokemonService";
import PokemonInfo from "./components/PokemonInfo.vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    Header,
    PokemonInfo,
    List,
  },
  data() {
    return {
      dialog: false,
      pokemons: Object,
      selectedPokemon: {},
    };
  },
  async mounted() {
    this.pokemons = await getAllPokemons();
  },
  methods: {
    selectPokemon(pokemon) {
      this.dialog = true;
      this.selectedPokemon = pokemon;
    },
  },
};
</script>

<template>
  <v-app>
    <Header />
    <v-dialog width="600" v-model="dialog">
      <PokemonInfo :pokemon="selectedPokemon" />
    </v-dialog>
    <List
      v-if="pokemons.count > 0"
      :listPaginated="pokemons"
      @selectPokemon="selectPokemon($event)"
    />
  </v-app>
</template>
