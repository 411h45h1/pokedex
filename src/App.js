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
import { isMobile, isTablet } from "./components";

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
    (console.log("window size", window.innerWidth),
    (
      <>
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <AppContext.Provider value={{ state, dispatch }}>
            <Grid
              columns="equal"
              style={{
                margin:
                  isMobile() || isTablet()
                    ? "0px 25px 0px 25px"
                    : "0px 100px 0px 100px",
              }}
            >
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header>
                    <PokemonLogo
                      height={isMobile() ? 50 : 150}
                      width={isMobile() ? 150 : 400}
                    />
                  </Header>
                </Grid.Column>
                <Grid.Column width={isMobile() ? 16 : 10}>
                  {/*Left Square*/}
                  <PokedexInput />
                </Grid.Column>
                <Grid.Column>
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
