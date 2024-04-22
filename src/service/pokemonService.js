import axios from "axios";
import { evolutionChainNames, formatPokemon } from "../utils/pokemon";

const URL_API = 'https://pokeapi.co/api/v2/';

export const getAllPokemons = async (
  url = `${URL_API}pokemon?offset=20&limit=20`
) => {
  try {
    const { data } = await axios.get(url);
    const pks = data.results.map(({url}) => axios.get(url));
    const results = await Promise.all(pks);
    return {
      next: data.next,
      count: data.count,
      results: results.map((r) => formatPokemon(r.data)),
    };
  } catch (error) {
    console.error("Error get all pokemons:", error);
    throw error;
  }
};

export const getSpecies = async (id) => {
  try {
    const response = await axios.get(
      `${URL_API}pokemon-species/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error get species:", error);
    throw error;
  }
};

export const getEvolutions = async (id) => {
  const species = await getSpecies(id);
  try {
    const response = await axios.get(species.evolution_chain.url);
    return evolutionChainNames(response.data.chain);
  } catch (error) {
    console.error("Error get evolutions", error);
    throw error;
  }
};


