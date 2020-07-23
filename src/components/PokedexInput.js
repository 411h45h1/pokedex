import React from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import { PokemonSearch } from ".";

const DexInput = () => {
  return (
    <Segment inverted color="brown" style={{ minHeight: 600 }}>
      <Label as="a" size="huge" color="teal" ribbon>
        Search
      </Label>
      <Grid style={{ marginTop: 10 }}>
        <Grid.Column>
          <PokemonSearch />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default DexInput;
