import React, { useContext } from "react";
import { Grid, Label, List, Segment, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";
import { capitalizeString } from "../";

const TypeSearchOutput = () => {
  const { state } = useContext(AppContext);
  const { firstTypeSelected, secondTypeSelected } = state;
  return (
    <Grid>
      <Grid.Row centered columns="1">
        <Grid.Column>
          <Segment inverted style={{ overflow: "auto", maxHeight: 400 }}>
            {firstTypeSelected && (
              <div style={{ marginBottom: "5vh" }}>
                <Label
                  as="a"
                  color="blue"
                  size="huge"
                  attached="top left"
                  content={
                    `${capitalizeString(firstTypeSelected)}` +
                    `${
                      secondTypeSelected
                        ? " - " + capitalizeString(secondTypeSelected)
                        : ""
                    }`
                  }
                  // onClick={() => handleRandomPokemon()}
                />
              </div>
            )}

            <List divided inverted relaxed>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Snickerdoodle</List.Header>
                  <List.Description>
                    <Image src={require("../../typeIcons/water.png")} />
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default TypeSearchOutput;
