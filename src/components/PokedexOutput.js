import React, { useContext } from "react";
import { Segment, Grid, Label, Image } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString, isMobile, isTablet, EvolutionStages } from ".";
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

const PokedexOutput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { pokeDexEntry, globalPokedexIndex } = state;

  const getEntry = async (entry) => {
    //get pokemon source url
    let entryFound = globalPokedexIndex.find((obj) => obj.pokedexId === entry);
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

  const handlePrev = () =>
    getEntry(pokeDexEntry.id - 1)
      .then((res) => {
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

  const handleNext = () =>
    getEntry(pokeDexEntry.id + 1)
      .then((res) => {
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

  const handleRandomPokemon = () =>
    getEntry(Math.floor(Math.random() * 808))
      .then((res) => {
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

  return pokeDexEntry ? (
    <Segment inverted color="grey">
      <Label
        as="a"
        color="black"
        size="large"
        attached="top left"
        onClick={() => handleRandomPokemon()}
      >
        Random
      </Label>
      <div style={{ margin: "2.5px 0px 2.5px 0px" }} />
      <Label as={Media} at="mobile" size={"large"} color="red" ribbon="right">
        {pokeDexEntry.id < 808
          ? `Pokédex Entry #${pokeDexEntry.id} - ${pokeDexEntry.name}`
          : `Pokédex ${pokeDexEntry.name}`}
      </Label>

      <Label as={Media} at="tablet" size={"large"} color="red" ribbon="right">
        {pokeDexEntry.id < 808
          ? `Pokédex Entry #${pokeDexEntry.id} - ${pokeDexEntry.name}`
          : `Pokédex ${pokeDexEntry.name}`}
      </Label>

      <Label
        as={Media}
        greaterThanOrEqual="computer"
        size={"huge"}
        color="red"
        ribbon="right"
      >
        {pokeDexEntry.id < 808
          ? `Pokédex Entry #${pokeDexEntry.id} - ${pokeDexEntry.name}`
          : `Pokédex ${pokeDexEntry.name}`}
      </Label>
      {/* //////
      {pokeDexEntry.id < 808 ? (

        <Label
          size={isMobile() || isTablet() ? "large" : "huge"}
          color="red"
          ribbon="right"
        >
          Pokédex Entry #{pokeDexEntry.id} - {pokeDexEntry.name}
        </Label>
      ) : (
        <Label
          size={isMobile() || isTablet() ? "large" : "huge"}
          color="red"
          ribbon="right"
        >
          Pokédex {pokeDexEntry.name}
        </Label>
      )} */}

      <Grid>
        <Grid.Row as={Media} at="mobile" centered columns={3}>
          {pokeDexEntry.types.map((i, k) => (
            <Grid.Column key={k}>
              <Image
                style={{ marginTop: 10, marginBottom: -20 }}
                src={require(`../assets/typeIcons/${i.type.name}.png`)}
                alt="A Pokemon type"
                width={"75%"}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
        <Grid.Row as={Media} at="tablet" centered columns={3}>
          {pokeDexEntry.types.map((i, k) => (
            <Grid.Column key={k}>
              <Image
                style={{ marginTop: 10, marginBottom: -20 }}
                src={require(`../assets/typeIcons/${i.type.name}.png`)}
                alt="A Pokemon type"
                width={"100%"}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
        <Grid.Row as={Media} greaterThanOrEqual="computer" centered columns={3}>
          {pokeDexEntry.types.map((i, k) => (
            <Grid.Column key={k}>
              <Image
                style={{ marginTop: 10, marginBottom: -20 }}
                src={require(`../assets/typeIcons/${i.type.name}.png`)}
                alt="A Pokemon type"
                width={"75%"}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
        <Grid.Row as={Media} at="mobile" centered columns={2}>
          <Grid.Column>
            {pokeDexEntry.photo ? (
              <Image
                src={pokeDexEntry.photo}
                alt="Pokemon"
                height={"100%"}
                width={"100%"}
              />
            ) : (
              <Grid centered>
                <h6 style={{ fontSize: 20, marginTop: 30 }}>
                  Api Sprite Not availible
                </h6>
              </Grid>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as={Media} at="tablet" centered columns={1}>
          <Grid.Column>
            {pokeDexEntry.photo ? (
              <Image
                src={pokeDexEntry.photo}
                alt="Pokemon"
                height={"100%"}
                width={"100%"}
              />
            ) : (
              <Grid centered>
                <h6 style={{ fontSize: 20, marginTop: 30 }}>
                  Api Sprite Not availible
                </h6>
              </Grid>
            )}

            <EvolutionStages />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row as={Media} greaterThanOrEqual="computer" centered columns={2}>
          <Grid.Column>
            {pokeDexEntry.photo ? (
              <Image
                src={pokeDexEntry.photo}
                alt="Pokemon"
                height={"100%"}
                width={"100%"}
              />
            ) : (
              <Grid centered>
                <h6 style={{ fontSize: 20, marginTop: 30 }}>
                  Api Sprite Not availible
                </h6>
              </Grid>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Label
        as={Media}
        at="mobile"
        size={"large"}
        color="blue"
        ribbon
        style={{ marginTop: "5%" }}
      >
        Hp: {pokeDexEntry.stats.hp} Attack: {pokeDexEntry.stats.attack} Defense:{" "}
        {pokeDexEntry.stats.defense}
      </Label>

      <Label
        as={Media}
        at="tablet"
        size={"large"}
        color="blue"
        ribbon
        style={{ marginTop: "5%" }}
      >
        Hp: {pokeDexEntry.stats.hp} Attack: {pokeDexEntry.stats.attack} Defense:{" "}
        {pokeDexEntry.stats.defense}
      </Label>

      <Label
        as={Media}
        greaterThanOrEqual="computer"
        size={"huge"}
        color="blue"
        ribbon
        style={{ marginTop: "5%" }}
      >
        Hp: {pokeDexEntry.stats.hp} Attack: {pokeDexEntry.stats.attack} Defense:{" "}
        {pokeDexEntry.stats.defense}
      </Label>

      <Label as={Media} at="mobile" size={"large"} color="teal" ribbon="right">
        Sp. Atk: {pokeDexEntry.stats["special-attack"]} Sp. Def:{" "}
        {pokeDexEntry.stats["special-defense"]} Speed:{" "}
        {pokeDexEntry.stats.speed}
      </Label>

      <Label as={Media} at="tablet" size={"large"} color="teal" ribbon="right">
        Sp. Atk: {pokeDexEntry.stats["special-attack"]} Sp. Def:{" "}
        {pokeDexEntry.stats["special-defense"]} Speed:{" "}
        {pokeDexEntry.stats.speed}
      </Label>

      <Label
        as={Media}
        greaterThanOrEqual="computer"
        size={"huge"}
        color="teal"
        ribbon="right"
      >
        Sp. Atk: {pokeDexEntry.stats["special-attack"]} Sp. Def:{" "}
        {pokeDexEntry.stats["special-defense"]} Speed:{" "}
        {pokeDexEntry.stats.speed}
      </Label>

      <div style={{ marginTop: isMobile() || isTablet() ? "17%" : "10%" }}>
        {pokeDexEntry.id < 807 ? (
          pokeDexEntry.id !== 1 ? (
            <>
              <Label
                as="a"
                color="black"
                size="large"
                attached="bottom left"
                icon="hand point left outline"
                content="Back"
                onClick={() => handlePrev()}
              />
              <Label
                as="a"
                color="black"
                size="large"
                attached="bottom right"
                icon="hand point right outline"
                content="Next"
                onClick={() => handleNext()}
              />
            </>
          ) : (
            <Label
              as="a"
              color="black"
              size="large"
              attached="bottom right"
              icon="hand point right outline"
              content="Next"
              onClick={() => handleNext()}
            />
          )
        ) : (
          <Label
            as="a"
            color="black"
            size="large"
            attached="bottom left"
            icon="hand point left outline"
            content="Back"
            onClick={() => handlePrev()}
          />
        )}
      </div>
    </Segment>
  ) : (
    <Segment inverted color="grey" style={{ marginBottom: 20 }}>
      <Label
        as="a"
        color="black"
        size="large"
        attached="top"
        icon="random"
        content="Click here to see a random Pokémon"
        onClick={() => handleRandomPokemon()}
      />
    </Segment>
  );
};

export default PokedexOutput;
