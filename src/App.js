import React, { useState, useEffect } from "react";
import axios from "axios";
// import Loader from "./assets/images/loader.gif";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  useEffect(() => {
    encounterWildPokemon();
  }, []);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const encounterWildPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then(response => {
        console.log("response.data", response.data);
        setWildPokemon(response.data);
      });
  };

  const catchPokemon = pokemon => {
    setPokedex(state => {
      const monExists = state.filter(p => pokemon.id === p.id).length > 0;

      if (!monExists) {
        state = [...state, pokemon];
        state.sort((a, b) => {
          return a.id - b.id;
        });
      }
      return state;
    });
    encounterWildPokemon();
  };
  console.log("wildPokemon", wildPokemon);

  return (
    <div className="container">
      <header>
        <h1 className="title">Pokemon Table test</h1>
      </header>
      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            wildPokemon.id +
            ".png"
          }
          className="sprite"
          alt="pokemon"
        />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>
          CATCH
        </button>
      </section>
      <section className="pokedex">
        <h2>Pokedex</h2>
        <div className="pokedex-list">
          {pokedex.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
                }
                alt="sd"
                className="sprite"
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button className="remove">&times;</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
