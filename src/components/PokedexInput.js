import React, { useContext } from "react";
import { Grid, Segment, Button, Label } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { PokemonSearch, capitalizeString } from ".";

const DexInput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { globalPokedexIndex, pokemonName, pokedexId } = state;
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
    <Segment inverted color="brown" style={{ minHeight: 600 }}>
      <Label as="a" size="huge" color="teal" ribbon>
        Search
      </Label>
      <Grid style={{ marginTop: 10 }}>
        <Grid.Column>
          <PokemonSearch />
          {pokemonName.length || pokedexId.length > 0 ? (
            <Button color="red" content="Clear" onClick={() => handleClear()} />
          ) : null}
          <Button
            content="Search"
            color="blue"
            disabled={pokemonName.length + pokedexId.length > 1 ? false : true}
            onClick={() => handleSubmit()}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default DexInput;
