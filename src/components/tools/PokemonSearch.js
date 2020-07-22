import React, { useContext } from "react";
import Autosuggest from "react-autosuggest";
import "./Autosuggest.css";
import AppContext from "../../context/AppContext";
import { Grid } from "semantic-ui-react";

const PokemonSearch = () => {
  const { state, dispatch } = useContext(AppContext);

  const {
    globalPokedexIndex,
    pokemonName,
    pokemonNameSuggestions,
    pokedexId,
    pokedexIdSuggestions,
  } = state;

  const pokemonNameInputProps = {
    placeholder: "Pokemon Name",
    value: pokemonName,
    onChange: (event, { newValue }) =>
      dispatch({ type: "UPDATE_FORM_POKEDEX_NAME", payload: newValue }),
  };
  const pokedexIdInputProps = {
    placeholder: "Id #",
    value: pokedexId,
    onChange: (event, { newValue }) =>
      dispatch({ type: "UPDATE_FORM_POKEDEX_ID", payload: newValue }),
  };

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

  const getSuggestionEmail = (suggestion) => suggestion.pokedexId;

  const renderSuggestion = (suggestion) => (
    <span>
      #{suggestion.pokedexId} - {suggestion.pokemonName}
    </span>
  );

  return (
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column width={2}>
          <Autosuggest
            suggestions={pokedexIdSuggestions}
            onSuggestionsFetchRequested={({ value }) =>
              dispatch({
                type: "UPDATE_POKEDEX_ID_SUGGESTIONS",
                payload: getSuggestions(value),
              })
            }
            onSuggestionsClearRequested={() =>
              dispatch({ type: "CLEAR_POKEDEX_ID_SUGGESTIONS" })
            }
            onSuggestionSelected={(event, { suggestion }) =>
              dispatch({
                type: "STORE_POKEDEX_ID_SUGGESTIONS",
                payload: suggestion.pokemonName,
              })
            }
            getSuggestionValue={getSuggestionEmail}
            renderSuggestion={renderSuggestion}
            inputProps={pokedexIdInputProps}
          />
        </Grid.Column>

        <Grid.Column width={14}>
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
          />{" "}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PokemonSearch;
