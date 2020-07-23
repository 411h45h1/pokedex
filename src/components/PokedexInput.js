import React, { useContext } from "react";
import { Grid, Segment, Button, Header } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { PokemonSearch, capitalizeString } from ".";

const DexInput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { globalPokedexIndex, pokemonName } = state;
  const getEntry = async (entry) => {
    //get pokemon source url
    let entryFound = globalPokedexIndex.find(
      (obj) => obj.pokemonName === entry
    );
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

  const handleSubmit = () =>
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
      .catch((err) => console.log("Error @ Submit"));

  const handleClear = () =>
    dispatch({
      type: "CLEAR_FORM_POKEDEX_ENTRIES",
    });

  return (
    <Segment
      inverted
      color="brown"
      style={{ textAlign: "center", minHeight: 600 }}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" floated="left" inverted>
              Search
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <PokemonSearch />

            <Button color="red" content="Clear" onClick={() => handleClear()} />
            <Button content="Submit" onClick={() => handleSubmit()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default DexInput;
