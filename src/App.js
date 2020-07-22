import React, { useEffect, useState, useContext, useReducer } from "react";
import { Grid, Segment } from "semantic-ui-react";

//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";

const capitalizeString = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const App = () => {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { globalPokedexIndex } = state;
  const [pokeDexEntry, setPokeDexEntry] = useState();

  useEffect(() => {
    if (!globalPokedexIndex) {
      getGlobalPokedexIndex();
    }
  }, [globalPokedexIndex]);

  const getGlobalPokedexIndex = async () => {
    let fetchPokedex = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=809"
    );
    let pokedexIndex = await fetchPokedex.json();
    return dispatch({
      type: "GET_POKEDEX_INDEX",
      payload: pokedexIndex.results,
    });
  };

  const getEntry = async (entry) => {
    //get pokemon source url
    let pokeDexEntry = globalPokedexIndex.find((obj) => obj.name === entry);
    let dataURL = pokeDexEntry.url;
    //get pokemon data
    let entryDataFetch = await fetch(`${dataURL}`);
    let pokedexDataEntry = await entryDataFetch.json();
    //value return
    let name = capitalizeString(pokedexDataEntry.name);
    let id = pokedexDataEntry.id;
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let types = pokedexDataEntry.types;

    console.log("types", types);
    //console.log(`Selected Pokemon: ( #${id}, ${name}) `);
    return { name, primarySprite, id, types };
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
              <Segment
                inverted
                color="brown"
                style={{ textAlign: "center", minHeight: 600 }}
                onClick={() =>
                  getEntry("garchomp").then((res) => {
                    setPokeDexEntry((prevState) => {
                      return {
                        ...prevState,
                        photo: res.primarySprite,
                        name: res.name,
                        id: res.id,
                        types: res.types,
                      };
                    });
                  })
                }
              ></Segment>
            </Grid.Column>
            <Grid.Column width={8}>
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
