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
});

export default AppContext;
