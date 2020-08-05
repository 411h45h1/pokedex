import React, { useEffect, useContext, useReducer } from "react";

//style lib
import "./App.css";
import { Grid, Header, Button, Icon } from "semantic-ui-react";
import { createMedia } from "@artsy/fresnel";

//context
import AppContext from "./context/AppContext";
import reducer from "./context/reducer";
//components
import { PokedexInput, PokedexOutput } from "./components";
import PokemonLogo from "./assets/PokemonLogo";
import { Scrollbars } from "react-custom-scrollbars";

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
    <Scrollbars style={{ width: "100vw", height: "100vh" }}>
      {globalPokedexIndex && (
        // (console.log("H:", window.outerHeight, "W:", window.outerWidth),
        <>
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <AppContext.Provider value={{ state, dispatch }}>
              <Grid style={{ margin: "5px 10px 5px 15px" }}>
                <Grid.Row id="Drag">
                  <Grid.Column width={16} id="Drag" as={Media} at="mobile">
                    <Button.Group id="NoDrag" floated="right">
                      <Button
                        as={"a"}
                        href="https://github.com/AhmedAlihashi/pokedex"
                        target="_blank"
                        rel="noopener noreferrer"
                        content="Click here for the repository"
                      />
                      <Button
                        icon="power off"
                        color="red"
                        onClick={() => {
                          window.close();
                        }}
                      />
                    </Button.Group>
                  </Grid.Column>

                  <Grid.Column width={16} id="Drag" as={Media} at="mobile">
                    <Grid centered>
                      <Header>
                        <PokemonLogo
                          height={100}
                          width={400}
                          style={{ marginTop: 20, marginBottom: 20 }}
                        />
                      </Header>
                    </Grid>
                  </Grid.Column>

                  <Grid.Column
                    width={10}
                    id="Drag"
                    as={Media}
                    greaterThanOrEqual="tablet"
                  >
                    <Header as={Media} greaterThanOrEqual="tablet" id="NoDrag">
                      <PokemonLogo height={150} width={400} style={{}} />
                    </Header>
                  </Grid.Column>

                  <Grid.Column
                    width={6}
                    id="Drag"
                    as={Media}
                    greaterThanOrEqual="tablet"
                  >
                    <Button.Group id="NoDrag" floated="right">
                      <Button
                        as={"a"}
                        href="https://github.com/AhmedAlihashi/pokedex"
                        target="_blank"
                        rel="noopener noreferrer"
                        content="Click here for the repository"
                      />
                      <Button
                        icon="power off"
                        color="red"
                        onClick={() => {
                          window.close();
                        }}
                      />
                    </Button.Group>
                  </Grid.Column>

                  {/* <Grid.Column width={16}>
                    <Grid centered style={{ marginBottom: 15 }}>
                      <Header as={Media} at="mobile">
                        <PokemonLogo height={80} width={175} />
                      </Header>
                      <Header as={Media} greaterThanOrEqual="tablet">
                        <PokemonLogo height={150} width={400} />
                      </Header>
                    </Grid>
                  </Grid.Column> */}
                  <Grid.Column
                    as={Media}
                    greaterThanOrEqual="tablet"
                    width={10}
                  >
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
      )}
    </Scrollbars>
  );
};

export default App;
