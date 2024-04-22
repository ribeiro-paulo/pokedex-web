<script>
export default {
    name: "Card",
    props: {
        poke: Object,
    },
    data: () => ({
        pokemon: Object,
    }),
    mounted() {
        this.pokemon = {
            ...this.poke,
            type: this.typeFormat(this.poke.types),
        };
    },
    methods: {
        typeFormat(types) {
            return types.length > 1 ?
                types[0] + ", +" + (types.length - 1) :
                types[0];
        },
    },
};
</script>

<template>
    <v-card class="text-capitalize" width="240" height="278" elevation="8">
        <v-container v-if="pokemon?.id" :class="['type-background', pokemon.types[0]]">
            <v-row class="d-flex flex-column" no-gutters>
                <h3 class="text-center text-truncate w-100">
                    {{ pokemon.name }} #{{ pokemon.id }}
                    <v-tooltip activator="parent" location="top">#{{ pokemon.id }}
                    </v-tooltip>
                </h3>
                <v-img :src="pokemon.thumbnail" height="180" :alt="pokemon.name" :aspect-ratio="1 / 1">
                </v-img>
            </v-row>
            <div class="justify-center d-flex flex-row">
                <v-chip :class="['ma-2', 'chip-bg', pokemon.types[0]]" label>
                    {{ pokemon.type }}
                    <v-tooltip activator="parent" location="top">
                        Tipo
                    </v-tooltip>
                </v-chip>
                <v-chip class="ma-2" prepend-icon="mdi-star" label>
                    {{ pokemon.species }}
                    <v-tooltip activator="parent" location="top">
                        Espécie
                    </v-tooltip>
                </v-chip>
            </div>
        </v-container>
    </v-card>
</template>
