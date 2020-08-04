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
        onEvolutionChain: false,
      };

    //evolution chain
    case "UPDATE_EVOLUTION_CHAIN":
      return {
        ...state,
        globalEvolutionChain: payload,
      };

    case "LOAD_EVOLUTION_STAGES":
      return {
        ...state,
        onEvolutionChain: true,
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
        firstPokemonTypeArr: null,
        secondPokemonTypeArr: null,
        renderedSearch: null,
      };
    //Type Search (basically all the pokemon with the type passed
    // firstTypeSelected or secondTypeSelected
    case "UPDATE_FIRST_POKEMON_LIST_WANTED":
      return {
        ...state,
        firstPokemonTypeArr: payload,
      };
    case "UPDATE_SECOND_POKEMON_LIST_WANTED":
      return {
        ...state,
        secondPokemonTypeArr: payload,
      };

    case "UPDATE_SEARCH":
      return {
        ...state,
        renderedSearch: payload,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        renderedSearch: null,
      };

    default:
      return state;
  }
}
