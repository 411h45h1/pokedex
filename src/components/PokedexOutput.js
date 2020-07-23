import React, { useContext } from "react";
import {
  Segment,
  Icon,
  Grid,
  Label,
  Image,
  Header,
  Button,
} from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString } from ".";

const DexOutput = () => {
  const { state, dispatch } = useContext(AppContext);
  const { pokeDexEntry, globalPokedexIndex, pokedexId } = state;

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

    let name = capitalizeString(pokedexDataEntry.name);
    let id = pokedexDataEntry.id;
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let types = pokedexDataEntry.types;

    console.log(`Selected Pokemon: ( #${id}, ${name} )`);
    return { name, primarySprite, id, types };
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
          },
        });
      })
      .catch((err) => console.log("Error @ Submit", err));

  return pokeDexEntry ? (
    (console.log(pokedexId, pokedexId + 1, pokeDexEntry),
    (
      <Segment inverted color="grey" style={{ minHeight: 600 }}>
        <Label as="a" size="huge" color="red" ribbon="right">
          Pokédex #{pokeDexEntry.id} {pokeDexEntry.name}
        </Label>
        <Grid>
          <Grid.Row centered columns={1}>
            <Grid.Column>
              <Image
                src={pokeDexEntry.photo}
                alt="Pokemon"
                height="100%"
                width="88%"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={3}>
            {pokeDexEntry.types.map((i, k) => (
              <Grid.Column>
                <Image
                  key={k}
                  src={require(`../typeIcons/${i.type.name}.png`)}
                  alt="A Pokemon type"
                  width={"75%"}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
        <div>
          <Button
            floated="left"
            animated="vertical"
            onClick={() => handlePrev()}
          >
            <Button.Content hidden>Back</Button.Content>
            <Button.Content visible>
              <Icon name="hand point left outline" />
            </Button.Content>
          </Button>

          <Button
            floated="right"
            animated="vertical"
            onClick={() => handleNext()}
          >
            <Button.Content hidden>Next</Button.Content>
            <Button.Content visible>
              <Icon name="hand point right outline" />
            </Button.Content>
          </Button>
        </div>
      </Segment>
    ))
  ) : (
    <Segment inverted color="grey" style={{ minHeight: 600 }}>
      <Grid centered>
        <Header as="h3" style={{}} textAlign="center">
          No content loaded
        </Header>
      </Grid>
    </Segment>
  );
};

export default DexOutput;
