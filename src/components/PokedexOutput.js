import React, { useContext } from "react";
import { Segment, Grid, Label, Image } from "semantic-ui-react";
import AppContext from "../context/AppContext";

const DexOutput = () => {
  const { state } = useContext(AppContext);
  const { pokeDexEntry } = state;
  return pokeDexEntry ? (
    <Segment inverted color="grey" style={{ minHeight: 600 }}>
      <Label as="a" size="huge" color="red" ribbon="right">
        Pokédex #{pokeDexEntry.id} {pokeDexEntry.name}
      </Label>
      <Grid centered>
        {/* <Grid.Row>
            <Grid.Column>
              <Header inverted as="h1" floated="right">
                Name: {pokeDexEntry.name}
              </Header>

              <Header inverted as="h1" floated="left">
                Pokédex #{pokeDexEntry.id}
              </Header>
            </Grid.Column>
          </Grid.Row> */}
        <Image
          src={pokeDexEntry.photo}
          alt="Pokemon"
          height="100%"
          width="88%"
        />
        {pokeDexEntry.types.map((i, k) => (
          <Image
            key={k}
            src={require(`../typeIcons/${i.type.name}.png`)}
            alt="A Pokemon type"
            width="30%"
          />
        ))}
      </Grid>
    </Segment>
  ) : (
    <Segment inverted color="grey" style={{ minHeight: 600 }} />
  );
};

export default DexOutput;
