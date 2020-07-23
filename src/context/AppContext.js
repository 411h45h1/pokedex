import { createContext } from "react";

const AppContext = createContext({
  globalPokedexIndex: null,
  pokeDexEntry: null,
  //name form
  pokemonName: "",
  pokemonNameSuggestions: [],
  pokedexId: null,
});

export default AppContext;
