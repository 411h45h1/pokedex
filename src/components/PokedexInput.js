import React, { useContext, useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString, PokemonSearch } from ".";

const DexInput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { globalPokedexIndex } = state;
  const [pokemonForm, setPokemonForm] = useState({ pokemon: "" });

  const handleChange = (e, { pokemon, value }) =>
    setPokemonForm((prevState) => {
      return { ...prevState, [pokemon]: value };
    });

  // const handleSubmit = () =>
  //   getEntry(pokemonForm.pokemon)
  //     .then((res) => {
  //       dispatch({
  //         type: "UPDATE_POKEDEX_ENTRY",
  //         payload: {
  //           photo: res.primarySprite,
  //           name: res.name,
  //           id: res.id,
  //           types: res.types,
  //         },
  //       });
  //     })
  //     .catch((err) => console.log("Error @ Submit"));

  const handleChangeTest = (value, match) => {
    // value: holds the user input value
    // match: whether the value matches one the values in the dictionary/suggestion
    if (match) {
      //fetchSomething(value);
      setPokemonForm((prevState) => {
        return { ...prevState, value };
      });
    }
  };

  return (
    <Segment
      inverted
      color="brown"
      style={{ textAlign: "center", minHeight: 600 }}
    >
      <div>
        {/* <Form onSubmit={handleSubmit}>
          <Form.Input
            placeholder="Pokemon name"
            pokemon="pokemon"
            value={pokemonForm.pokemon}
            onChange={handleChange}
          />

          <Form.Button content="Submit" />
        </Form> */}
      </div>
      <PokemonSearch />
    </Segment>
  );
};
export default DexInput;
