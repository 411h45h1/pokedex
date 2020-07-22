import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import Autosuggest from "react-autosuggest";
import "./Autosuggest.css";
import AppContext from "../../context/AppContext";
import capitalizeString from "./capitalize";

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
      Pokedex: #{suggestion.pokedexId} - {suggestion.pokemonName}
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

  return (
    <div className="container">
      <Button content="Submit" onClick={() => handleSubmit()} />

      <form>
        <div className="pokedexId">
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
        </div>
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
      </form>
    </div>
  );
};

export default PokemonSearch;
