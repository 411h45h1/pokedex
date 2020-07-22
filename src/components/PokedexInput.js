import React from "react";
import { Segment } from "semantic-ui-react";
//import AppContext from "../context/AppContext";
import { PokemonSearch } from ".";

const DexInput = () => {
  //  const { state, dispatch } = useContext(AppContext);

  return (
    <Segment
      inverted
      color="brown"
      style={{ textAlign: "center", minHeight: 600 }}
    >
      <PokemonSearch />
    </Segment>
  );
};
export default DexInput;
