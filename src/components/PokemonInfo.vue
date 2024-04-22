<script>
import { getEvolutions } from '../service/pokemonService';
import Sprites from './Sprites.vue';

export default {
    name: 'PokemonInfo',
    props: {
        pokemon: Object
    },
    components: { Sprites },
    data: () => ({
        evolutions: [],
    }),
    async mounted() {
        this.evolutions = await getEvolutions(this.pokemon.id);
    }
}
</script>

<style scoped>
.wallpaper {
    min-height: 150px;
}

.thumb {
    bottom: -40px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}
</style>

<template>
    <v-card class="text-capitalize" cover>
        <div :class="['position-relative', 'wallpaper', 'type-background', pokemon.types[0]]">
            <img class="thumb position-absolute" :aspect-ratio="1/1" :src="pokemon.thumbnail" :alt="pokemon.name" height="140" />
        </div>
        <div class="pa-4">
            <h1 class="text-center mt-8"> {{ pokemon.name }} #{{ pokemon.id }}</h1>
            <div class="d-flex flex-wrap ga-3 justify-center">
                <v-chip v-for="(type) in pokemon.types" :key="type" :class="['chip-bg', type]" label>
                    {{ type }}
                </v-chip>
                <v-chip prepend-icon="mdi-star" color="orange-darken-4" label>
                    {{ pokemon.species }}
                </v-chip>
            </div>
            <v-card-text>
                <div class="font-weight-bold ms-1 mb-2">Evolução</div>
                <v-timeline align="start" density="compact">
                    <v-timeline-item v-for="(evolution) in evolutions" :dot-color="evolution === pokemon.name ? 'blue-grey-darken-1' : 'blue-grey-lighten-2'" :key="evolution" size="x-small">
                        <div class="text-capitalize mb-4">
                            <div>{{ evolution }}</div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div class="font-weight-bold ms-1 mb-2">Movimentos</div>
                <v-responsive class="overflow-y-auto" max-height="280">
                    <v-chip-group class="mt-3 text-capitalize" column>
                        <v-chip v-for="topic in pokemon.moves" :key="topic" :text="topic" :value="topic"></v-chip>
                    </v-chip-group>
                </v-responsive>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div class="font-weight-bold ms-1 mb-2">Indices</div>
                <v-table height="300px">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Index
                            </th>
                            <th class="text-left">
                                Nome
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pokemon.indices" :key="item.name">
                            <td>{{ item.index }}</td>
                            <td>{{ item.name }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div class="font-weight-bold ms-1 mb-2">Sprites</div>
                <Sprites :pokemon="pokemon" />
            </v-card-text>
        </div>
    </v-card>
</template>
