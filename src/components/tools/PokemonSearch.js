import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import "./Autosuggest.css";
import AppContext from "../../context/AppContext";
const users = [
  {
    pokemonName: "1111111",
    pokedexId: "aaaa@aaa",
  },
  {
    pokemonName: "2222",
    pokedexId: "bbb@bbbb",
  },
  {
    pokemonName: "333",
    pokedexId: "ccc@ccc",
  },
  {
    pokemonName: "444",
    pokedexId: "dddd@dddd",
  },
  {
    pokemonName: "555",
    pokedexId: "eee@eeee",
  },
];

const PokemonSearch = () => {
  const context = useContext(AppContext);
  const [state, setState] = useState({
    pokemonName: "",
    pokemonNameSuggestions: [],
    pokedexId: "",
    pokedexIdSuggestions: [],
  });

  const {
    pokemonName,
    pokemonNameSuggestions,
    pokedexId,
    pokedexIdSuggestions,
  } = state;

  const nicknameInputProps = {
    placeholder: "Pokemon Name",
    value: pokemonName,
    onChange: (event, { newValue }) =>
      setState((prevState) => {
        return { ...prevState, pokemonName: newValue };
      }),
  };
  const emailInputProps = {
    placeholder: "Id #",
    value: pokedexId,
    onChange: (event, { newValue }) =>
      setState((prevState) => {
        return { ...prevState, pokedexId: newValue };
      }),
  };

  const escapeRegexCharacters = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");

    return context.state.globalPokedexIndex.filter(
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

  return (
    <div className="container">
      <div className="pokedexId">
        <Autosuggest
          suggestions={pokedexIdSuggestions}
          onSuggestionsFetchRequested={({ value }) =>
            setState((prevState) => {
              return {
                ...prevState,
                pokedexIdSuggestions: getSuggestions(value),
              };
            })
          }
          onSuggestionsClearRequested={() =>
            setState((prevState) => {
              return { ...prevState, pokedexIdSuggestions: [] };
            })
          }
          onSuggestionSelected={(event, { suggestion }) =>
            setState((prevState) => {
              return { ...prevState, pokemonName: suggestion.pokemonName };
            })
          }
          getSuggestionValue={getSuggestionEmail}
          renderSuggestion={renderSuggestion}
          inputProps={emailInputProps}
        />
      </div>

      <Autosuggest
        suggestions={pokemonNameSuggestions}
        onSuggestionsFetchRequested={({ value }) =>
          setState((prevState) => {
            return {
              ...prevState,
              pokemonNameSuggestions: getSuggestions(value),
            };
          })
        }
        onSuggestionsClearRequested={() =>
          setState((prevState) => {
            return { ...prevState, pokemonNameSuggestions: [] };
          })
        }
        onSuggestionSelected={(event, { suggestion }) =>
          setState((prevState) => {
            return { ...prevState, pokedexId: suggestion.pokedexId };
          })
        }
        getSuggestionValue={getSuggestionNickname}
        renderSuggestion={renderSuggestion}
        inputProps={nicknameInputProps}
      />
    </div>
  );
};

export default PokemonSearch;
