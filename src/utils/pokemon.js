export const evolutionChainNames = (chain, names = []) => {
  names.push(chain.species.name);
  if (chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evolution) => {
      evolutionChainNames(evolution, names);
    });
  }
  return names;
};

export const formatPokemon = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((item) => item.type.name),
    species: pokemon.species.name,
    thumbnail: pokemon.sprites.other.dream_world.front_default,
    sprites: extractImageUrls(pokemon.sprites),
    moves: pokemon.moves.map((item) => item.move.name),
    indices: pokemon.game_indices.map((item) => ({
      name: item.version.name,
      index: item.game_index,
    })),
  };
};

const extractImageUrls = (obj) => {
  const urls = [];
  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      urls.push(value);
    } else if (value !== null && typeof value === "object") {
      urls.push(...extractImageUrls(value));
    }
  }
  return urls;
};
