import React from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import {
  PokemonSearch,
  PokemonTypeSearch,
  TypeSearchOutput,
  isMobile,
  isTablet,
} from ".";

const PokedexInput = () => {
  return (
    <Segment inverted color="brown" style={{ marginBottom: 10 }}>
      <Label
        size={isMobile() || isTablet() ? "large" : "huge"}
        color="teal"
        ribbon
      >
        Search Pokemon based on name or id
      </Label>
      <Grid style={{ marginTop: 10 }}>
        <Grid.Column>
          <PokemonSearch />
        </Grid.Column>
      </Grid>
      <Label
        size={isMobile() || isTablet() ? "large" : "huge"}
        color="yellow"
        ribbon
      >
        Search Pokemon based on their type
      </Label>
      <Grid style={{ marginTop: 10 }}>
        {isMobile() || isTablet() ? (
          <Grid.Column width={16}>
            <TypeSearchOutput />
          </Grid.Column>
        ) : null}
        <Grid.Column width={isMobile() || isTablet() ? 16 : 9}>
          <PokemonTypeSearch />
        </Grid.Column>
        {isMobile() || isTablet() ? null : (
          <Grid.Column width={7}>
            <TypeSearchOutput />
          </Grid.Column>
        )}
      </Grid>
    </Segment>
  );
};
export default PokedexInput;
