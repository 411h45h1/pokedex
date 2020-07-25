import React, {
  useContext,
  useState,
} from "../../node_modules/@types/react/node_modules/@types/react";
import {
  Form,
  Segment,
} from "../../node_modules/semantic-ui-reacts/semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString } from ".";

const PokedexInput = ({ height }) => {
  const { state, dispatch } = useContext(AppContext);
  const { globalPokedexIndex } = state;
  const [pokemonForm, setPokemonForm] = useState({ pokemon: "" });

  const getEntry = async (entry) => {
    //get pokemon source url
    let entryFound = globalPokedexIndex.find((obj) => obj.name === entry);
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

  const handleChange = (e, { pokemon, value }) =>
    setPokemonForm((prevState) => {
      return { ...prevState, [pokemon]: value };
    });

  const handleSubmit = () =>
    getEntry(pokemonForm.pokemon)
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
    <Segment
      inverted
      color="brown"
      style={{ textAlign: "center", minHeight: height }}
    >
      <div id="NoDrag">
        <Form onSubmit={handleSubmit}>
          <Form.Input
            placeholder="Pokemon name"
            pokemon="pokemon"
            value={pokemonForm.pokemon}
            onChange={handleChange}
          />

          <Form.Button content="Submit" />
        </Form>
      </div>
    </Segment>
  );
};
export default PokedexInput;
