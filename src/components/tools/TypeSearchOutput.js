import React, { useContext, useEffect, useState } from "react";
import { Grid, Label, List, Segment, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";
import { capitalizeString } from "../";

const TypeSearchOutput = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    firstTypeSelected,
    secondTypeSelected,
    firstPokemonTypeArr,
    secondPokemonTypeArr,
    renderedSearch,
    globalPokedexIndex,
  } = state;

  const [secondTypeLoaded, setSecondTypeLoaded] = useState(false);

  const getEntry = async (entry) => {
    //get pokemon source url
    let entryFound = globalPokedexIndex.find(
      (obj) => obj.pokemonName === entry
    );
    console.log(entry);
    let dataURL = entryFound.url;

    //get pokemon data
    let entryDataFetch = await fetch(`${dataURL}`).catch((err) =>
      console.log(err)
    );

    let pokedexDataEntry = await entryDataFetch.json();
    //value return

    let name = capitalizeString(pokedexDataEntry.name);
    let id = pokedexDataEntry.id;
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let types = pokedexDataEntry.types;

    console.log(`Selected Pokemon: ( #${id}, ${name} )`);
    return { name, primarySprite, id, types };
  };

  const handleSubmit = (pokemonName) =>
    getEntry(pokemonName)
      .then((res) => {
        dispatch({
          type: "UPDATE_POKEDEX_ENTRY",
          payload: {
            photo: res.primarySprite,
            name: res.name,
            id: res.id,
            types: res.types,
          },
        });
      })
      .catch((err) => console.log("Error @ typeSearch Submit", err));

  const RenderList = () =>
    renderedSearch.length > 1 ? (
      renderedSearch.map((i, k) => (
        <List.Item key={k} as="a" onClick={() => handleSubmit(i.name)}>
          <List.Content verticalAlign="middle" style={{ fontWeight: "bold" }}>
            {capitalizeString(i.name)}
          </List.Content>
          <Image src={require(`../../typeIcons/${firstTypeSelected}.png`)} />
          {"  "}
          {secondTypeLoaded && (
            <Image src={require(`../../typeIcons/${secondTypeSelected}.png`)} />
          )}
        </List.Item>
      ))
    ) : (
      <List.Item>
        <List.Content>
          <List.Header>There are no pokemon found with the type</List.Header>
          <List.Description>
            <Image src={require(`../../typeIcons/${firstTypeSelected}.png`)} />

            <Image src={require(`../../typeIcons/${secondTypeSelected}.png`)} />
          </List.Description>
        </List.Content>
      </List.Item>
    );

  useEffect(() => {
    if (!renderedSearch && firstTypeSelected && !secondTypeSelected) {
      //first click of button
      dispatch({
        type: "UPDATE_SEARCH",
        payload: firstPokemonTypeArr.allWantedPokemon,
      });
      setSecondTypeLoaded(false);
    } else if (
      renderedSearch &&
      firstTypeSelected &&
      secondTypeSelected &&
      !secondTypeLoaded
    ) {
      //clear renderer
      dispatch({ type: "CLEAR_SEARCH" });

      //merge 2 arr
      const firstType = firstPokemonTypeArr.allWantedPokemon;

      const secondType = secondPokemonTypeArr.allWantedPokemon;
      const bothTypes = [];

      firstType.forEach((_firstType) => {
        const existsOnTeamBlue = secondType.find(
          (_secondType) => _secondType.name === _firstType.name
        );

        if (existsOnTeamBlue) {
          bothTypes.push(_firstType);
        }
      });

      console.log("pokemon with both types =>", bothTypes);
      dispatch({ type: "UPDATE_SEARCH", payload: bothTypes });

      setSecondTypeLoaded(true);
    }
  }, [
    firstPokemonTypeArr,
    secondPokemonTypeArr,
    renderedSearch,
    secondTypeLoaded,
  ]);

  console.log("state", { ...state });

  return (
    firstPokemonTypeArr && (
      <Grid>
        <Grid.Row centered columns="1">
          <Grid.Column>
            <Segment style={{ overflow: "auto", maxHeight: 400 }}>
              {firstTypeSelected && (
                <div style={{ marginBottom: "20%" }}>
                  <Label
                    color="blue"
                    size="huge"
                    attached="top left"
                    content={
                      `${capitalizeString(firstTypeSelected)}` +
                      `${
                        secondTypeSelected
                          ? " - " + capitalizeString(secondTypeSelected)
                          : ""
                      }`
                    }
                    // onClick={() => handleRandomPokemon()}
                  />
                </div>
              )}

              <List divided animated relaxed size="massive">
                {renderedSearch && <RenderList />}
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
};
export default TypeSearchOutput;
