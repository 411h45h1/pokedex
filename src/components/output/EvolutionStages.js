import React, { useContext, useState, useEffect } from "react";
import { Grid, Image, Segment, Card, Button } from "semantic-ui-react";
import AppContext from "../../context/AppContext";

const EvolutionStages = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    pokeDexEntry,
    globalPokedexIndex,
    onEvolutionChain,
    globalEvolutionChain,
  } = state;
  const [evoSprites, setEvoSprites] = useState([]);

  useEffect(() => {
    if (onEvolutionChain) {
      renderEvoChain().then(() => setEvoSprites([]));
    }
  }, [pokeDexEntry, onEvolutionChain]);

  const renderEvoChain = async () => {
    const evoChain = pokeDexEntry.evolutionChain;
    let evoArr = [];

    console.log("chain", evoChain);
    let neededObj = globalEvolutionChain.find((o) => {
      return o.base == evoChain;
    });
    let baseForm = Object.values(neededObj)[0];
    let secondForm = Object.values(neededObj)[1].second;
    let thirdForm = Object.values(neededObj)[1].third;

    console.log("needed evo chain", baseForm, secondForm, thirdForm);
    evoArr = [baseForm, secondForm, thirdForm];
    let filteredEvoArr = evoArr.filter((x) => x);

    // let secondEvo = evoChain.evolves_to[0].species.name;
    // let thirdEvo =
    //   evoChain.evolves_to[0].evolves_to[0] &&
    //   evoChain.evolves_to[0].evolves_to[0].species.name;

    // if (first && secondEvo && thirdEvo) {
    //   evoArr.push(first, secondEvo, thirdEvo);
    // } else if (first && secondEvo && !thirdEvo) {
    //   evoArr.push(first, secondEvo);
    // } else if (first && !secondEvo && !thirdEvo) {
    //   evoArr.push(first);
    // }

    console.log("evoChain names", evoArr);
    //TODO figure out how to get the related data from evoArr (pics)

    let urls = filteredEvoArr.map((evo, k) => {
      if (evo) {
        let entryFound = globalPokedexIndex.find(
          (obj) => obj.pokemonName == evo
        );

        return entryFound.url;
      }
    });
    console.log("avail urls", urls);

    urls.map(async (url) => {
      //get pokemon data
      let entryDataFetch = await fetch(`${url}`).catch((err) =>
        console.log(err)
      );

      let pokedexDataEntry = await entryDataFetch.json();
      let sprite = pokedexDataEntry.sprites.front_default;
      return setEvoSprites((preState) => [...preState, sprite]);
    });

    // evoArr.map(async (evo, k) => {
    //   if (evo) {
    //     let entryFound = globalPokedexIndex.find(
    //       (obj) => obj.pokemonName == evo
    //     );
    //     let dataURL = entryFound.url;

    //     //get pokemon data
    //     let entryDataFetch = await fetch(`${dataURL}`).catch((err) =>
    //       console.log(err)
    //     );

    //     let pokedexDataEntry = await entryDataFetch.json();
    //     let sprite = pokedexDataEntry.sprites.front_default;
    //     return setEvoSprites((preState) => [...preState, sprite]);
    //   } else {
    //     return null;
    //   }
    // });
  };
  console.log("state", evoSprites);
  return (
    <Grid centered>
      <Grid.Row columns={"equal"}>
        {pokeDexEntry.photo ? (
          onEvolutionChain ? (
            evoSprites.map((i, k) => (
              <Grid.Column key={k}>
                <Card>
                  <Image src={i} alt="Pokemon" height={"100%"} width={"100%"} />
                </Card>
              </Grid.Column>
            ))
          ) : (
            <Button onClick={() => dispatch({ type: "LOAD_EVOLUTION_STAGES" })}>
              Evolution Stages
            </Button>
          )
        ) : (
          <Grid centered>
            <h6 style={{ fontSize: 20, marginTop: 30 }}>
              Evolution Data Not Availible
            </h6>
          </Grid>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default EvolutionStages;
