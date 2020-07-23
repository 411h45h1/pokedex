import React, { useContext } from "react";
import { Segment, Header, Grid } from "semantic-ui-react";
import AppContext from "../context/AppContext";

const DexOutput = () => {
  const { state } = useContext(AppContext);
  const { pokeDexEntry } = state;
  return (
    <Segment
      inverted
      color="grey"
      style={{ textAlign: "center", minHeight: 600 }}
    >
      {pokeDexEntry ? (
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column>
              <Header inverted as="h1" floated="right">
                Name: {pokeDexEntry.name}
              </Header>
              <Header inverted as="h1" floated="left">
                Pokédex #{pokeDexEntry.id}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <img
                alt="Pokemon"
                src={pokeDexEntry.photo}
                height="100%"
                width="55%"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" inverted floated="left">
                Types:
              </Header>
              <Header as="h1" inverted floated="center">
                {pokeDexEntry.types.map((i) => (
                  <img
                    src={require(`../typeIcons/${i.type.name}.png`)}
                    alt="A Pokemon"
                  />
                ))}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : null}
    </Segment>
  );
};

export default DexOutput;
