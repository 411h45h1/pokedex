import React, { useEffect, useContext, useReducer } from "react";

//style lib
import { Grid, Header } from "semantic-ui-react";
import { createMedia } from "@artsy/fresnel";

//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";
//components
import { PokedexInput, PokedexOutput } from "./components";
import PokemonLogo from "./assets/PokemonLogo";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

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
      "https://pokeapi.co/api/v2/pokemon?limit=964"
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
    globalPokedexIndex &&
    (console.log(window.outerHeight, window.outerWidth),
    (
      <>
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <AppContext.Provider value={{ state, dispatch }}>
            <Grid style={{ margin: "5px 10px 5px 15px" }}>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Grid centered style={{ marginBottom: 15 }}>
                    <Header as={Media} at="mobile">
                      <PokemonLogo height={80} width={175} />
                    </Header>
                    <Header as={Media} greaterThanOrEqual="tablet">
                      <PokemonLogo height={150} width={400} />
                    </Header>
                  </Grid>
                </Grid.Column>
                <Grid.Column as={Media} greaterThanOrEqual="tablet" width={10}>
                  {/*Left Square*/}
                  <PokedexInput />
                </Grid.Column>
                <Grid.Column as={Media} at="mobile" width={16}>
                  {/*Left Square*/}
                  <PokedexInput />
                </Grid.Column>
                <Grid.Column as={Media} greaterThanOrEqual="tablet" width={6}>
                  {/*Right Square*/}
                  <PokedexOutput />
                </Grid.Column>
                <Grid.Column as={Media} at="mobile" width={16}>
                  {/*Right Square*/}
                  <PokedexOutput />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </AppContext.Provider>
        </MediaContextProvider>
      </>
    ))
  );
};

export default App;
