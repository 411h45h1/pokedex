import React, { useContext } from "react";
import { Segment, Header } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString } from ".";

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
        <div>
          <Header as="h1" floated="right">
            Name: {pokeDexEntry.name}
          </Header>
          <Header as="h1" floated="left">
            Pokédex #{pokeDexEntry.id}
          </Header>

          <img
            alt="Pokemon"
            src={pokeDexEntry.photo}
            height="60%"
            width="60%"
          />
          <p>
            Types:
            {pokeDexEntry.types.map(
              (i) => " " + capitalizeString(i.type.name) + " "
            )}
          </p>
        </div>
      ) : null}
    </Segment>
  );
};

export default DexOutput;
