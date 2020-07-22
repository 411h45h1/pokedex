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

    default:
      return state;
  }
}
