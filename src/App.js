import React, { useEffect, useState } from "react";

const App = () => {
  const [globalPokedexIndex, setGlobalPokedexIndex] = useState(null);
  const [pokeDexEntry, setPokeDexEntry] = useState();

  useEffect(() => {
    if (!globalPokedexIndex) {
      getGlobalPokedexIndex();
    }
  }, []);

  const getGlobalPokedexIndex = async () => {
    let fetchPokedex = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=809"
    );
    let pokedexIndex = await fetchPokedex.json();
    return setGlobalPokedexIndex(pokedexIndex.results);
  };

  const getEntry = async (entry) => {
    let pokeDexEntry = globalPokedexIndex.find((obj) => obj.name === entry);
    let dataURL = pokeDexEntry.url;
    let entryDataFetch = await fetch(`${dataURL}`);
    let pokedexDataEntry = await entryDataFetch.json();
    let primarySprite = pokedexDataEntry.sprites.front_default;
    let name = pokedexDataEntry.name;
    let id = pokedexDataEntry.id;

    console.log(`Selected Pokemon: ( #${id}, ${name}) `);
    return { name, primarySprite, id };
  };

  return (
    globalPokedexIndex && (
      <div style={{ textAlign: "center" }}>
        <p
          onClick={() =>
            getEntry("snorlax").then((res) => {
              setPokeDexEntry((prevState) => {
                return {
                  ...prevState,
                  photo: res.primarySprite,
                  name: res.name,
                  id: res.id,
                };
              });
            })
          }
        >
          Ahmed's Pokedex
        </p>
        {pokeDexEntry ? (
          <div>
            <img src={pokeDexEntry.photo} height="250" width="250" />
            <p>PokeDex Entry: {pokeDexEntry.id}</p>

            <p> Name: {pokeDexEntry.name} </p>
          </div>
        ) : null}
      </div>
    )
  );
};

export default App;
