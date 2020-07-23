import React, { useEffect, useContext, useReducer } from "react";

//style lib
import { Grid, Header } from "semantic-ui-react";
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
      getGlobalPokedexIndex().then(() => console.log(`Fetched api index`));
    }
  }, [globalPokedexIndex]);

  const getGlobalPokedexIndex = async () => {
    let fetchPokedex = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=809"
    ).catch((err) => console.error(err));
    let pokedexIndex = await fetchPokedex.json();
    let refinedIndex = pokedexIndex.results.map((i, k) => {
      return { pokedexId: k + 1, pokemonName: i.name, url: i.url };
    });

    return dispatch({
      type: "GET_POKEDEX_INDEX",
      payload: refinedIndex,
    });
  };

  return (
    globalPokedexIndex && (
      <AppContext.Provider value={{ state, dispatch }}>
        <Grid style={{ margin: "0px 100px 0px 100px " }}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header style={{ marginLeft: 20, fontSize: "10vh" }}>
                Pokédex
              </Header>
            </Grid.Column>
            <Grid.Column width={10}>
              {/*Left Square*/}
              <PokedexInput />
            </Grid.Column>
            <Grid.Column width={6}>
              {/*Right Square*/}
              <PokedexOutput />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AppContext.Provider>
    )
  );
};

export default App;
