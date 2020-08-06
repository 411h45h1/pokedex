import React from "react";
import {
  chandelure,
  charizard,
  darkLugia,
  dizzy,
  gangar,
  greninja,
  hondoom,
  infernape,
  kirlia,
  lugia,
  megaCharizard,
  megaGyarados,
  mew,
  psyduck,
  Rayquaza,
  squirtleStep,
  staraptor,
  yveltal,
} from "../assets/pokemonGif";

const pokemonGifs = [
  chandelure,
  charizard,
  darkLugia,
  dizzy,
  gangar,
  greninja,
  hondoom,
  infernape,
  kirlia,
  lugia,
  megaCharizard,
  megaGyarados,
  mew,
  psyduck,
  Rayquaza,
  squirtleStep,
  staraptor,
  yveltal,
];

let randomize = Math.floor(Math.random() * pokemonGifs.length);

const RandomPokemonGif = (props) => (
  <img src={pokemonGifs[randomize]} alt="random pokemon gif" {...props} />
);

export default RandomPokemonGif;
