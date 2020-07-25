import { createContext } from "../../node_modules/@types/react/node_modules/@types/react";

const AppContext = createContext({
  globalPokedexIndex: null,
  pokeDexEntry: null,
});

export default AppContext;
