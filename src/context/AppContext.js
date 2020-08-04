import { createContext } from "react";

const AppContext = createContext({
  globalPokedexIndex: null,
  pokeDexEntry: null,
  //name search
  pokemonName: "",
  pokemonNameSuggestions: [],
  pokedexId: null,
  //type search
  firstTypeSelected: null,
  secondTypeSelected: null,
  //
  firstPokemonTypeArr: null,
  secondPokemonTypeArr: null,
  renderedSearch: null,
  //
  globalEvolutionChain: null,
  onEvolutionChain: false,
});

export default AppContext;
