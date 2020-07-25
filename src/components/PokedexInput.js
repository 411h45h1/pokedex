import React from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import {
  PokemonSearch,
  PokemonTypeSearch,
  TypeSearchOutput,
  isMobile,
} from ".";

const PokedexInput = () => {
  return (
    <Segment inverted color="brown" style={{ marginBottom: 10 }}>
      <Label size={isMobile() ? "large" : "huge"} color="teal" ribbon>
        Search Pokemon based on name or id
      </Label>
      <Grid style={{ marginTop: 10 }}>
        <Grid.Column>
          <PokemonSearch />
        </Grid.Column>
      </Grid>
      <Label size={isMobile() ? "large" : "huge"} color="yellow" ribbon>
        Search Pokemon based on their type
      </Label>
      <Grid style={{ marginTop: 10 }}>
        {isMobile() ? (
          <Grid.Column width={16}>
            <TypeSearchOutput />
          </Grid.Column>
        ) : null}
        <Grid.Column width={isMobile() ? 16 : 9}>
          <PokemonTypeSearch />
        </Grid.Column>
        {isMobile() ? null : (
          <Grid.Column width={7}>
            <TypeSearchOutput />
          </Grid.Column>
        )}
      </Grid>
    </Segment>
  );
};
export default PokedexInput;
