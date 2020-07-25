import React, { useContext } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";

const PokemonTypeSearch = () => {
  const { state, dispatch } = useContext(AppContext);
  const { firstTypeSelected, secondTypeSelected } = state;

  const getTypeEntrys = async (type) => {
    //get pokemon data
    let fetchType = await fetch(
      `https://pokeapi.co/api/v2/type/${type}`
    ).catch((err) => console.log(err));

    let typeDataEntry = await fetchType.json();

    let allWantedPokemon = typeDataEntry.pokemon.map((i, k) => {
      let name = i.pokemon.name;
      let url = i.pokemon.url;

      return {
        name: name,
        typePossible: type,
        url: url,
      };
    });

    return { allWantedPokemon };
  };

  const handleUpdate = (value) => {
    if (!firstTypeSelected) {
      // Update first selected
      dispatch({ type: "UPDATE_FIRST_SELECTED_TYPE", payload: value });

      getTypeEntrys(value)
        .then((res) => {
          dispatch({
            type: "UPDATE_FIRST_POKEMON_LIST_WANTED",
            payload: res,
          });
        })
        .catch((err) => console.log("Error @ getTypeEntries", err));
    } else if (
      firstTypeSelected &&
      !secondTypeSelected &&
      firstTypeSelected !== value
    ) {
      // Update second selected
      dispatch({ type: "UPDATE_SECOND_SELECTED_TYPE", payload: value });
      getTypeEntrys(value)
        .then((res) => {
          dispatch({
            type: "UPDATE_SECOND_POKEMON_LIST_WANTED",
            payload: res,
          });
        })
        .catch((err) => console.log("Error @ getTypeEntries", err));
    } else {
      // Clear
      dispatch({ type: "CLEAR_SELECTED_TYPE" });
      dispatch({ type: "CLEAR_SEARCH" });
    }
  };

  return (
    <Grid>
      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "bug"
                ? "green"
                : secondTypeSelected === "bug"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("bug")}
          >
            <Image
              src={require("../../assets/typeIcons/bug.png")}
              alt="The Pokemon type bug"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "dark"
                ? "green"
                : secondTypeSelected === "dark"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("dark")}
          >
            <Image
              src={require("../../assets/typeIcons/dark.png")}
              alt="The Pokemon type dark"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "dragon"
                ? "green"
                : secondTypeSelected === "dragon"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("dragon")}
          >
            <Image
              src={require("../../assets/typeIcons/dragon.png")}
              alt="The Pokemon type dragon"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "electric"
                ? "green"
                : secondTypeSelected === "electric"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("electric")}
          >
            <Image
              src={require("../../assets/typeIcons/electric.png")}
              alt="The Pokemon type electric"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "fairy"
                ? "green"
                : secondTypeSelected === "fairy"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("fairy")}
          >
            <Image
              src={require("../../assets/typeIcons/fairy.png")}
              alt="The Pokemon type fairy"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "fighting"
                ? "green"
                : secondTypeSelected === "fighting"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("fighting")}
          >
            <Image
              src={require("../../assets/typeIcons/fighting.png")}
              alt="The Pokemon type fighting"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "fire"
                ? "green"
                : secondTypeSelected === "fire"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("fire")}
          >
            <Image
              src={require("../../assets/typeIcons/fire.png")}
              alt="The Pokemon type fire"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "flying"
                ? "green"
                : secondTypeSelected === "flying"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("flying")}
          >
            <Image
              src={require("../../assets/typeIcons/flying.png")}
              alt="The Pokemon type flying"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "ghost"
                ? "green"
                : secondTypeSelected === "ghost"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("ghost")}
          >
            <Image
              src={require("../../assets/typeIcons/ghost.png")}
              alt="The Pokemon type ghost"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "grass"
                ? "green"
                : secondTypeSelected === "grass"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("grass")}
          >
            <Image
              src={require("../../assets/typeIcons/grass.png")}
              alt="The Pokemon type grass"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "ground"
                ? "green"
                : secondTypeSelected === "ground"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("ground")}
          >
            <Image
              src={require("../../assets/typeIcons/ground.png")}
              alt="The Pokemon type ground"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "ice"
                ? "green"
                : secondTypeSelected === "ice"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("ice")}
          >
            <Image
              src={require("../../assets/typeIcons/ice.png")}
              alt="The Pokemon type ice"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */}
      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "normal"
                ? "green"
                : secondTypeSelected === "normal"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("normal")}
          >
            <Image
              src={require("../../assets/typeIcons/normal.png")}
              alt="The Pokemon type normal"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "poison"
                ? "green"
                : secondTypeSelected === "poison"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("poison")}
          >
            <Image
              src={require("../../assets/typeIcons/poison.png")}
              alt="The Pokemon type poison"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "psychic"
                ? "green"
                : secondTypeSelected === "psychic"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("psychic")}
          >
            <Image
              src={require("../../assets/typeIcons/psychic.png")}
              alt="The Pokemon type psychic"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="3">
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "rock"
                ? "green"
                : secondTypeSelected === "rock"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("rock")}
          >
            <Image
              src={require("../../assets/typeIcons/rock.png")}
              alt="The Pokemon type rock"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "steel"
                ? "green"
                : secondTypeSelected === "steel"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("steel")}
          >
            <Image
              src={require("../../assets/typeIcons/steel.png")}
              alt="The Pokemon type steel"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={
              firstTypeSelected === "water"
                ? "green"
                : secondTypeSelected === "water"
                ? "green"
                : null
            }
            onClick={() => handleUpdate("water")}
          >
            <Image
              src={require("../../assets/typeIcons/water.png")}
              alt="The Pokemon type water"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default PokemonTypeSearch;
