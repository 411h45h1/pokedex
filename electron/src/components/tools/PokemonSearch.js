import React, { useContext } from "react";
import Autosuggest from "react-autosuggest";
import "./Autosuggest.css";
import AppContext from "../../context/AppContext";
import { Grid, Form, Button } from "semantic-ui-react";
import { capitalizeString } from "../";
import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const { Media } = AppMedia;

const PokemonSearch = () => {
  const { state, dispatch } = useContext(AppContext);

  const {
    globalPokedexIndex,
    pokemonName,
    pokemonNameSuggestions,
    pokedexId,
    // pokedexIdSuggestions,
  } = state;

  const pokemonNameInputProps = {
    placeholder: "Pokemon search",
    value: pokemonName,
    onChange: (event, { newValue }) =>
      dispatch({ type: "UPDATE_FORM_POKEDEX_NAME", payload: newValue }),
  };
  // const pokedexIdInputProps = {
  //   placeholder: "Id #",
  //   value: pokedexId,
  //   onChange: (event, { newValue }) =>
  //     dispatch({ type: "UPDATE_FORM_POKEDEX_ID", payload: newValue }),
  // };

  const escapeRegexCharacters = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");

    return globalPokedexIndex.filter(
      (pokemon) =>
        regex.test(pokemon.pokemonName) || regex.test(pokemon.pokedexId)
    );
  };

  const getSuggestionNickname = (suggestion) => suggestion.pokemonName;

  // const getSuggestionEmail = (suggestion) => suggestion.pokedexId;

  const renderSuggestion = (suggestion) => (
    <span>
      #{suggestion.pokedexId} - {suggestion.pokemonName}
    </span>
  );
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
    let statsArray = pokedexDataEntry.stats.map((i) => {
      return { name: i.stat.name, baseStat: i.base_stat };
    });
    let stats = statsArray.reduce(
      (obj, item) => ({ ...obj, [item.name]: item.baseStat }),
      {}
    );
    let name = capitalizeString(pokedexDataEntry.name);
    let id = pokedexDataEntry.id;
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let types = pokedexDataEntry.types;

    return { name, primarySprite, id, types, stats };
  };
  const handleSubmit = () =>
    getEntry(pokemonName)
      .then((res) => {
        //TODO use res.name to check if the 3d animation exists then display that sprite
        dispatch({
          type: "UPDATE_POKEDEX_ENTRY",
          payload: {
            photo: res.primarySprite,
            name: res.name,
            id: res.id,
            types: res.types,
            stats: res.stats,
          },
        });
      })
      .catch((err) => console.log("Error @ Submit", err));

  const handleClear = () =>
    dispatch({
      type: "CLEAR_FORM_POKEDEX_ENTRIES",
    });

  return (
    <Form>
      <Grid columns="equal">
        <Grid.Row centered>
          <Grid.Column as={Media} at="mobile" width={16}>
            <Form.Field>
              <Autosuggest
                suggestions={pokemonNameSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  dispatch({
                    type: "UPDATE_POKEDEX_NAME_SUGGESTIONS",
                    payload: getSuggestions(value),
                  })
                }
                onSuggestionsClearRequested={() =>
                  dispatch({ type: "CLEAR_POKEDEX_NAME_SUGGESTIONS" })
                }
                onSuggestionSelected={(event, { suggestion }) =>
                  dispatch({
                    type: "STORE_POKEDEX_NAME_SUGGESTIONS",
                    payload: suggestion.pokedexId,
                  })
                }
                getSuggestionValue={getSuggestionNickname}
                renderSuggestion={renderSuggestion}
                inputProps={pokemonNameInputProps}
              />
            </Form.Field>
          </Grid.Column>

          <Grid.Column as={Media} at="tablet" width={9}>
            <Form.Field>
              <Autosuggest
                suggestions={pokemonNameSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  dispatch({
                    type: "UPDATE_POKEDEX_NAME_SUGGESTIONS",
                    payload: getSuggestions(value),
                  })
                }
                onSuggestionsClearRequested={() =>
                  dispatch({ type: "CLEAR_POKEDEX_NAME_SUGGESTIONS" })
                }
                onSuggestionSelected={(event, { suggestion }) =>
                  dispatch({
                    type: "STORE_POKEDEX_NAME_SUGGESTIONS",
                    payload: suggestion.pokedexId,
                  })
                }
                getSuggestionValue={getSuggestionNickname}
                renderSuggestion={renderSuggestion}
                inputProps={pokemonNameInputProps}
              />
            </Form.Field>
          </Grid.Column>

          <Grid.Column as={Media} greaterThanOrEqual="computer" width={11}>
            <Form.Field>
              <Autosuggest
                suggestions={pokemonNameSuggestions}
                onSuggestionsFetchRequested={({ value }) =>
                  dispatch({
                    type: "UPDATE_POKEDEX_NAME_SUGGESTIONS",
                    payload: getSuggestions(value),
                  })
                }
                onSuggestionsClearRequested={() =>
                  dispatch({ type: "CLEAR_POKEDEX_NAME_SUGGESTIONS" })
                }
                onSuggestionSelected={(event, { suggestion }) =>
                  dispatch({
                    type: "STORE_POKEDEX_NAME_SUGGESTIONS",
                    payload: suggestion.pokedexId,
                  })
                }
                getSuggestionValue={getSuggestionNickname}
                renderSuggestion={renderSuggestion}
                inputProps={pokemonNameInputProps}
              />
            </Form.Field>
          </Grid.Column>

          <Grid.Column>
            <Form.Field>
              <div style={{ margin: "7px 0px 5px 0px" }}>
                {pokemonName.length || pokedexId > 0 ? (
                  <Button
                    size="mini"
                    color="red"
                    content="Clear"
                    onClick={() => handleClear()}
                  />
                ) : null}
                <Button
                  size="mini"
                  content="Search"
                  color="blue"
                  disabled={pokemonName.length + pokedexId > 1 ? false : true}
                  onClick={() => handleSubmit()}
                />
              </div>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default PokemonSearch;
