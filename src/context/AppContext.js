import { createContext } from "react";

const AppContext = createContext({
  globalPokedexIndex: null,
  pokeDexEntry: null,
  //form
  pokemonName: "",
  pokemonNameSuggestions: [],
  pokedexId: null,
});

export default AppContext;
