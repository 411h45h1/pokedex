import React from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import { PokemonSearch, PokemonTypeSearch, TypeSearchOutput } from ".";

const PokedexInput = () => {
  return (
    <Segment inverted color="brown" style={{ minHeight: 600 }}>
      <Label size="huge" color="teal" ribbon>
        Search Pokemon based on name or id
      </Label>
      <Grid style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid.Column>
          <PokemonSearch />
        </Grid.Column>
      </Grid>
      <Label size="huge" color="yellow" ribbon>
        Search Pokemon based on their type
      </Label>
      <Grid style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid.Column width={10}>
          <PokemonTypeSearch />
        </Grid.Column>
        <Grid.Column width={6}>
          <TypeSearchOutput />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default PokedexInput;
