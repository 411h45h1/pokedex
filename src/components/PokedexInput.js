import React from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import {
  PokemonSearch,
  PokemonTypeSearch,
  TypeSearchOutput,
  isMobile,
  isTablet,
} from ".";
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

const PokedexInput = () => {
  return (
    <Segment inverted color="brown" style={{ marginBottom: 10 }}>
      <Label as={Media} at="mobile" size={"large"} color="teal" ribbon>
        Search Pokemon based on name or id
      </Label>
      <Label as={Media} at="tablet" size={"large"} color="teal" ribbon>
        Search Pokemon based on name or id
      </Label>

      <Label
        as={Media}
        greaterThanOrEqual="computer"
        size={"huge"}
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

      <Label as={Media} at="mobile" size={"large"} color="yellow" ribbon>
        Search Pokemon based on their type
      </Label>
      <Label as={Media} at="tablet" size={"large"} color="yellow" ribbon>
        Search Pokemon based on their type
      </Label>

      <Label
        as={Media}
        greaterThanOrEqual="computer"
        size={"huge"}
        color="yellow"
        ribbon
      >
        Search Pokemon based on their type
      </Label>

      <Grid style={{ marginTop: 10 }}>
        <Grid.Column width={16} as={Media} at="mobile">
          <TypeSearchOutput />
        </Grid.Column>
        <Grid.Column width={16} as={Media} at="tablet">
          <TypeSearchOutput />
        </Grid.Column>

        <Grid.Column as={Media} at="mobile" width={16}>
          <PokemonTypeSearch />
        </Grid.Column>
        <Grid.Column as={Media} at="tablet" width={16}>
          <PokemonTypeSearch />
        </Grid.Column>
        <Grid.Column as={Media} greaterThanOrEqual="computer" width={9}>
          <PokemonTypeSearch />
        </Grid.Column>

        <Grid.Column as={Media} greaterThanOrEqual="computer" width={7}>
          <TypeSearchOutput />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default PokedexInput;
