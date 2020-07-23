import React, { useContext } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import AppContext from "../../context/AppContext";
import { capitalizeString } from "../";

const TypeSearchOutput = () => {
  const { state } = useContext(AppContext);
  const { firstTypeSelected, secondTypeSelected } = state;
  return (
    <Grid>
      <Grid.Row centered columns="1">
        <Grid.Column>
          <Segment inverted style={{ minHeight: 500 }}>
            {firstTypeSelected && (
              <Segment clearing>
                <Header as="h3" textAlign="center">
                  {capitalizeString(firstTypeSelected)}
                  {secondTypeSelected && " - "}
                  {secondTypeSelected && capitalizeString(secondTypeSelected)}
                </Header>
              </Segment>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default TypeSearchOutput;
