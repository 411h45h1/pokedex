import React, { useEffect, useContext, useReducer } from "react";

//style lib
import { Grid, Segment } from "semantic-ui-react";
//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";
//components
import { DexInput, capitalizeString } from "./components";

const App = () => {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { globalPokedexIndex, pokeDexEntry } = state;

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
    globalPokedexIndex && (
      <AppContext.Provider value={{ state, dispatch }}>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 75,
            marginBottom: -5,
          }}
        >
          Ahmed's Pokedex
        </p>

        <Grid>
          <Grid.Row style={{ margin: "0px 100px 0px 100px " }}>
            <Grid.Column width={8}>
              {/*Left Square*/}
              <DexInput />
            </Grid.Column>
            <Grid.Column width={8}>
              {/*Right Square*/}

              <Segment
                inverted
                color="grey"
                style={{ textAlign: "center", minHeight: 600 }}
              >
                {pokeDexEntry ? (
                  <div>
                    <p> Name: {pokeDexEntry.name}</p>
                    <p>PokeDex #{pokeDexEntry.id}</p>
                    <img
                      alt="Pokemon"
                      src={pokeDexEntry.photo}
                      height="250"
                      width="250"
                    />
                    <p>
                      Types:
                      {pokeDexEntry.types.map(
                        (i) => " " + capitalizeString(i.type.name) + " "
                      )}
                    </p>
                  </div>
                ) : null}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AppContext.Provider>
    )
  );
};

export default App;
