import React, { useEffect, useContext, useReducer } from "react";
import "./App.css";
//style lib
import { Grid, Header } from "semantic-ui-react";
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
  const { globalPokedexIndex, globalEvolutionChain } = state;

  useEffect(() => {
    if (!globalPokedexIndex) {
      getGlobalPokedexIndex();
    }
    if (!globalEvolutionChain) {
      getEvoChain();
    }
  }, [globalPokedexIndex, globalEvolutionChain]);

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
  const getEvoChain = async () => {
    let rootEvoChain = await fetch(
      "https://pokeapi.co/api/v2/evolution-chain?limit=419"
    ).catch((err) => console.error(err));
    let rootEvoChainEntry = await rootEvoChain.json();
    let ArrEvoChain = rootEvoChainEntry.results.map((i) => i.url);

    Promise.all(
      ArrEvoChain.map((url) => fetch(url).then((resp) => resp.json()))
    ).then((data) => {
      let evoChain = data.map((i) => i.chain);

      function collectResults(gamesPlayed) {
        let res = gamesPlayed.map((pokemon) => {
          let result = {
            base: pokemon.species.name,
            nextEvo: getResults(pokemon.evolves_to, 0),
          };
          return result;
        });
        return res;
      }
      function getResults(evolves_to, level) {
        const LEVELS = ["second", "third", "fourth"];
        if (!evolves_to.length) return {};
        else {
          let result = {};
          result[LEVELS[level]] = evolves_to[0].species.name;
          let resultsPrevious = getResults(evolves_to[0].evolves_to, ++level);

          return Object.assign(result, resultsPrevious);
        }
      }
      // console.log("res", evoChain);
      dispatch({
        type: "UPDATE_EVOLUTION_CHAIN",
        payload: collectResults(evoChain),
      });
    });
  };
  console.log("Global Evolution Chain", globalEvolutionChain);

  return (
    <Scrollbars style={{ width: "100vw", height: "100vh" }}>
      {globalPokedexIndex && (
        // (console.log("H:", window.outerHeight, "W:", window.outerWidth),

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
