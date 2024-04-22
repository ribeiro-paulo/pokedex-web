<script>
import Card from './Card.vue';
import { getAllPokemons } from '../service/pokemonService';
export default {
    name: 'List',
    props: {
        listPaginated: Object
    },
    components: { Card },
    data (){
        const nextUrl = this.listPaginated.next

        return {
        search: "",
        pokemons: [],
        nextUrl
    }},
    methods: {
        select(pokemon) {
            this.$emit('selectPokemon', pokemon)
        },
        async load({ done }) {
            if(!this.nextUrl) return done('empty');
            const { next, results } = await getAllPokemons(this.nextUrl)
            this.nextUrl = next;
            this.pokemons.push(...results);
            done('ok');
        },
        compareSearch(str) {
            const search = this.search.toLowerCase();
            return str.toLowerCase().includes(search);
        }
    },
    computed: {
        onSearch() {
            return this.pokemons.filter(item => {
                const name = this.compareSearch(item.name);
                const id = this.compareSearch(item.id.toString());
                const types = this.compareSearch(item.types.join(', '));
                const species = this.compareSearch(item.species);
                return name || id || types || species;
            });
        }
    },
}
</script>

<template>
    <v-main class="ma-2">
        <v-text-field v-model.lazy.trim="search" label="Pesquisar" placeholder='Nome, id, tipo ou espécie' variant="outlined">
        </v-text-field>
        <v-infinite-scroll class="overflow-x-hidden" :items="onSearch" :onLoad="load">
            <v-row class="pa-1">
                <v-col v-for="pokemon in onSearch" :key="pokemon.id" class="d-flex justify-center">
                    <Card :poke="pokemon" v-on:click="select(pokemon)" />
                </v-col>
            </v-row>
        </v-infinite-scroll>
    </v-main>
</template>
