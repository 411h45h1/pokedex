import React, { useEffect, useContext, useReducer } from "react";
import { Scrollbars } from "react-custom-scrollbars";

//style lib
import "./App.css";
import { Grid } from "semantic-ui-react";
//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";
//components
import { PokedexInput, PokedexOutput } from "./components";
import { Segment } from "semantic-ui-react";

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
    return dispatch({
      type: "GET_POKEDEX_INDEX",
      payload: pokedexIndex.results,
    });
  };

  return (
    <Scrollbars
      id="NoDrag"
      style={{ width: "100vw", height: "100vh", backgroundColor: null }}
    >
      <AppContext.Provider value={{ state, dispatch }}>
        {globalPokedexIndex && (
          <Segment
            style={{
              height: "100vh",
              width: "100vw",
            }}
            inverted
            tertiary
            className="Drag"
          >
            <h1
              id="NoDrag"
              style={{
                textAlign: "flex-Start",
                fontWeight: "bold",
                fontSize: 75,
                color: "black",
                //  marginBottom: -5,
              }}
            >
              Pokédex
            </h1>

            <Grid className="Drag">
              <Grid.Row>
                <Grid.Column width={8}>
                  {/*Left Square*/}
                  <PokedexInput height={"100%"} />
                </Grid.Column>
                <Grid.Column width={8}>
                  {/*Right Square*/}
                  <PokedexOutput height={"50%"} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
      </AppContext.Provider>
    </Scrollbars>
  );
};

export default App;
