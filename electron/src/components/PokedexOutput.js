import React, { useContext } from "react";
import { Segment } from "semantic-ui-react";
import AppContext from "../context/AppContext";
import { capitalizeString } from ".";

const DexOutput = ({ height }) => {
  const { state } = useContext(AppContext);
  const { pokeDexEntry } = state;
  return (
    <Segment
      inverted
      color="grey"
      style={{ textAlign: "center", minHeight: height }}
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
