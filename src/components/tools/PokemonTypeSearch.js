import React, { useState } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";
const PokemonTypeSearch = () => {
  const [types, setTypes] = useState({
    bug: false,
    dark: false,
    dragon: false,
    electric: false,
    fairy: false,
    fighting: false,
    fire: false,
    flying: false,
    ghost: false,
    grass: false,
    ground: false,
    ice: false,
    normal: false,
    poison: false,
    psychic: false,
    rock: false,
    steel: false,
    water: false,
  });
  return (
    <Grid>
      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.bug ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, bug: !prevState.bug };
              })
            }
          >
            <Image
              src={require("../../typeIcons/bug.png")}
              alt="The Pokemon type bug"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.dark ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, dark: !prevState.dark };
              })
            }
          >
            <Image
              src={require("../../typeIcons/dark.png")}
              alt="The Pokemon type dark"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.dragon ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, dragon: !prevState.dragon };
              })
            }
          >
            <Image
              src={require("../../typeIcons/dragon.png")}
              alt="The Pokemon type dragon"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.electric ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, electric: !prevState.electric };
              })
            }
          >
            <Image
              src={require("../../typeIcons/electric.png")}
              alt="The Pokemon type electric"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.fairy ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, fairy: !prevState.fairy };
              })
            }
          >
            <Image
              src={require("../../typeIcons/fairy.png")}
              alt="The Pokemon type fairy"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.fighting ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, fighting: !prevState.fighting };
              })
            }
          >
            <Image
              src={require("../../typeIcons/fighting.png")}
              alt="The Pokemon type fighting"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.fire ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, fire: !prevState.fire };
              })
            }
          >
            <Image
              src={require("../../typeIcons/fire.png")}
              alt="The Pokemon type fire"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.flying ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, flying: !prevState.flying };
              })
            }
          >
            <Image
              src={require("../../typeIcons/flying.png")}
              alt="The Pokemon type flying"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.ghost ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, ghost: !prevState.ghost };
              })
            }
          >
            <Image
              src={require("../../typeIcons/ghost.png")}
              alt="The Pokemon type ghost"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.grass ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, grass: !prevState.grass };
              })
            }
          >
            <Image
              src={require("../../typeIcons/grass.png")}
              alt="The Pokemon type grass"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.ground ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, ground: !prevState.ground };
              })
            }
          >
            <Image
              src={require("../../typeIcons/ground.png")}
              alt="The Pokemon type ground"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.ice ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, ice: !prevState.ice };
              })
            }
          >
            <Image
              src={require("../../typeIcons/ice.png")}
              alt="The Pokemon type ice"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */}
      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.normal ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, normal: !prevState.normal };
              })
            }
          >
            <Image
              src={require("../../typeIcons/normal.png")}
              alt="The Pokemon type normal"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.poison ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, poison: !prevState.poison };
              })
            }
          >
            <Image
              src={require("../../typeIcons/poison.png")}
              alt="The Pokemon type poison"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.psychic ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, psychic: !prevState.psychic };
              })
            }
          >
            <Image
              src={require("../../typeIcons/psychic.png")}
              alt="The Pokemon type psychic"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {/*----------------------------------------------------------------------------------------------------------*/}
      <Grid.Row centered columns="4">
        <Grid.Column>
          <Segment
            inverted
            color={types.rock ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, rock: !prevState.rock };
              })
            }
          >
            <Image
              src={require("../../typeIcons/rock.png")}
              alt="The Pokemon type rock"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.steel ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, steel: !prevState.steel };
              })
            }
          >
            <Image
              src={require("../../typeIcons/steel.png")}
              alt="The Pokemon type steel"
              width={"100%"}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment
            inverted
            color={types.water ? "green" : null}
            onClick={() =>
              setTypes((prevState) => {
                return { ...prevState, water: !prevState.water };
              })
            }
          >
            <Image
              src={require("../../typeIcons/water.png")}
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
