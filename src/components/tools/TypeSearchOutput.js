import React, { useContext, useEffect, useState } from "react";
import { Grid, Label, List, Segment, Image } from "semantic-ui-react";
import AppContext from "../../context/AppContext";
import { capitalizeString } from "../";

const TypeSearchOutput = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    firstTypeSelected,
    secondTypeSelected,
    firstPokemonTypeArr,
    secondPokemonTypeArr,
    renderedSearch,
  } = state;

  const [secondTypeLoaded, setSecondTypeLoaded] = useState(false);

  const RenderList = () =>
    renderedSearch.length > 1 ? (
      renderedSearch.map((i, k) => (
        <List.Item key={k} as="a">
          <List.Content verticalAlign="middle" style={{ fontWeight: "bold" }}>
            {capitalizeString(i.name)}
          </List.Content>
          <Image src={require(`../../typeIcons/${firstTypeSelected}.png`)} />
          {"  "}
          {secondTypeLoaded && (
            <Image src={require(`../../typeIcons/${secondTypeSelected}.png`)} />
          )}
        </List.Item>
      ))
    ) : (
      <List.Item>
        <List.Content>
          <List.Header>There are no pokemon found with the type</List.Header>
          <List.Description>
            <Image src={require(`../../typeIcons/${firstTypeSelected}.png`)} />

            <Image src={require(`../../typeIcons/${secondTypeSelected}.png`)} />
          </List.Description>
        </List.Content>
      </List.Item>
    );

  useEffect(() => {
    if (!renderedSearch && firstTypeSelected && !secondTypeSelected) {
      //first click of button
      dispatch({
        type: "UPDATE_SEARCH",
        payload: firstPokemonTypeArr.allWantedPokemon,
      });
      setSecondTypeLoaded(false);
    } else if (
      renderedSearch &&
      firstTypeSelected &&
      secondTypeSelected &&
      !secondTypeLoaded
    ) {
      //clear renderer
      dispatch({ type: "CLEAR_SEARCH" });

      //merge 2 arr
      const firstType = firstPokemonTypeArr.allWantedPokemon;

      const secondType = secondPokemonTypeArr.allWantedPokemon;
      const bothTypes = [];

      firstType.forEach((_firstType) => {
        const existsOnTeamBlue = secondType.find(
          (_secondType) => _secondType.name === _firstType.name
        );

        if (existsOnTeamBlue) {
          bothTypes.push(_firstType);
        }
      });

      console.log("pokemon with both types =>", bothTypes);
      dispatch({ type: "UPDATE_SEARCH", payload: bothTypes });

      setSecondTypeLoaded(true);
      //update renderer
    }
  }, [
    firstPokemonTypeArr,
    secondPokemonTypeArr,
    renderedSearch,
    secondTypeLoaded,
  ]);

  console.log("state", { ...state });

  return (
    firstPokemonTypeArr && (
      <Grid>
        <Grid.Row centered columns="1">
          <Grid.Column>
            <Segment style={{ overflow: "auto", maxHeight: 400 }}>
              {firstTypeSelected && (
                <div style={{ marginBottom: "20%" }}>
                  <Label
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

              <List divided animated relaxed size="massive">
                {renderedSearch && <RenderList />}
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
};
export default TypeSearchOutput;
