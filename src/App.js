import React, { useEffect, useContext, useReducer } from "react";

//style lib
import { Grid, Button, Icon } from "semantic-ui-react";
//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";
//components
import { PokedexInput, PokedexOutput } from "./components";

const App = () => {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { globalPokedexIndex } = state;

  useEffect(() => {
    if (!globalPokedexIndex) {
      getGlobalPokedexIndex();
    }
  }, [globalPokedexIndex]);

  const getGlobalPokedexIndex = async () => {
    let fetchPokedex = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=809"
    ).catch((err) => console.error(err));
    let pokedexIndex = await fetchPokedex.json();
    let refinedIndex = pokedexIndex.results.map((i, k) => {
      return { pokedexId: `${k + 1}`, pokemonName: i.name, url: i.url };
    });

    return dispatch({
      type: "GET_POKEDEX_INDEX",
      payload: refinedIndex,
    });
  };

  return (
    globalPokedexIndex &&
    (console.log(globalPokedexIndex),
    (
      <AppContext.Provider value={{ state, dispatch }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 75,
            marginBottom: -5,
          }}
        >
          Ahmed's Pokédex
        </h1>

        <Grid>
          <Grid.Row style={{ margin: "0px 100px 0px 100px " }}>
            <Grid.Column width={8}>
              {/*Left Square*/}
              <PokedexInput />
            </Grid.Column>
            <Grid.Column width={8}>
              {/*Right Square*/}
              <PokedexOutput />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AppContext.Provider>
    ))
  );
};

export default App;
