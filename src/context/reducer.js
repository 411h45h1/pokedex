export default function reducer(state, { type, payload }) {
  switch (type) {
    // Load
    case "GET_POKEDEX_INDEX":
      return {
        ...state,
        globalPokedexIndex: payload,
      };
    case "UPDATE_POKEDEX_ENTRY":
      return {
        ...state,
        pokeDexEntry: payload,
      };
    //FORM
    case "UPDATE_FORM_POKEDEX_NAME":
      return {
        ...state,
        pokemonName: payload,
      };

    case "CLEAR_FORM_POKEDEX_ENTRIES":
      return {
        ...state,
        pokemonName: "",
        pokedexId: "",
      };

    case "UPDATE_POKEDEX_NAME_SUGGESTIONS":
      return {
        ...state,
        pokemonNameSuggestions: payload,
      };
    case "CLEAR_POKEDEX_NAME_SUGGESTIONS":
      return {
        ...state,
        pokemonNameSuggestions: [],
      };
    case "STORE_POKEDEX_NAME_SUGGESTIONS":
      return {
        ...state,
        pokedexId: payload,
      };
    //Type Search
    case "UPDATE_FIRST_SELECTED_TYPE":
      return {
        ...state,
        firstTypeSelected: payload,
      };
    case "UPDATE_SECOND_SELECTED_TYPE":
      return {
        ...state,
        secondTypeSelected: payload,
      };
    case "CLEAR_SELECTED_TYPE":
      return {
        ...state,
        firstTypeSelected: null,
        secondTypeSelected: null,
      };

    default:
      return state;
  }
}
