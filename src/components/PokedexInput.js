import React from "react";
import { Grid, Segment, Button, Label } from "semantic-ui-react";
import { PokemonSearch, PokemonTypeSearch } from ".";

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
        <Grid.Column width={12}>
          <PokemonTypeSearch />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button content="Click" />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default PokedexInput;
