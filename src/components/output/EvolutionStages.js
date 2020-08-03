import React, { useContext } from "react";
import { Grid, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";

const EvolutionStages = () => {
  const { state, dispatch } = useContext(AppContext);
  const { pokeDexEntry, globalPokedexIndex } = state;

  const renderEvoChain = async () => {
    const evoChain = pokeDexEntry.evolutionChain;
    let evoArr = [];

    console.log("chain", evoChain);
    let first = evoChain.species.name;
    evoArr.push(first);
    //check second
    if (evoChain.evolves_to.length > 0) {
      let secondEvo = evoChain.evolves_to[0].species.name;
      evoArr.push(secondEvo);

      if (evoChain.evolves_to[0].evolves_to.length > 0) {
        let thirdEvo = evoChain.evolves_to[0].evolves_to[0].species.name;
        evoArr.push(thirdEvo);
      }
    }

    console.log("evoChain names", evoArr);
    //TODO figure out how to get the related data from evoArr (pics)
    // let evoArrSprites = evoArr.map((i, k) => {
    //   let entryFound = globalPokedexIndex.find((obj) => obj.pokemonName === i);
    //   let dataURL = entryFound.url;

    //   //get pokemon data
    //   let entryDataFetch = fetch(`${dataURL}`).catch((err) => console.log(err));

    //   let pokedexDataEntry = entryDataFetch.json();
    //   return { url: pokedexDataEntry };
    // });
    // console.log("pics found", evoArrSprites);
  };

  return (
    <Grid centered>
      <Grid.Row columns={3}>
        <Grid.Column>
          {pokeDexEntry.photo ? (
            renderEvoChain()
          ) : (
            <Grid centered>
              <h6 style={{ fontSize: 20, marginTop: 30 }}>
                Api Sprite Not availible
              </h6>
            </Grid>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default EvolutionStages;
