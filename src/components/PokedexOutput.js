import React, { useContext } from "react";
import { Segment } from "semantic-ui-react";
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
          <p> Name: {pokeDexEntry.name}</p>
          <p>Pokédex #{pokeDexEntry.id}</p>
          <img
            alt="Pokemon"
            src={pokeDexEntry.photo}
            height="250"
            width="250"
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
