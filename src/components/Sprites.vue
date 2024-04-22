<script>
export default {
    name: 'Sprites',
    props: {
        pokemon: Object
    },
}
</script>

<template>
    <v-card class="overflow-y-auto elevation-0" height="348">
        <v-row>
            <v-col v-for="(url, i) in pokemon.sprites" :key="i" class="d-flex child-flex" cols="4">
                <v-img :src="url" aspect-ratio="1" class="bg-grey-lighten-2" cover>
                    <template v-slot:placeholder>
                        <v-row
                          align="center"
                          class="fill-height ma-0"
                          justify="center"
                        >
                          <v-progress-circular
                            color="grey-lighten-5"
                            indeterminate
                          ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-col>
        </v-row>
    </v-card>
</template>
