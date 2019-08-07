import React, { useState, useEffect } from "react";
import axios from "axios";
// import Loader from "./assets/images/loader.gif";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [pokeName, setPokeName] = useState([]);

  const [wildPokemon, setWildPokemon] = useState({});
  const [pokemonAll, setPokemon] = useState([]);

  useEffect(() => {
    // getWildPokemon();
    getAllPokemonName();
    filteringName();
  }, []);

  // const pokeId = () => {
  //   const min = Math.ceil(1);
  //   const max = Math.floor(151);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // const getWildPokemon = id => {
  //   // console.log("ID>>>>>", id);
  //   // console.log("id === undefined", !id);

  //   axios
  //     .get("https://pokeapi.co/api/v2/pokemon/" + (!id ? pokeId() : id))
  //     .then(response => {
  //       // console.log("response.data", response.data);
  //       setWildPokemon(response.data);
  //     });
  // };

  // const catchPokemon = pokemon => {
  //   setPokedex(state => {
  //     const monExists = state.filter(p => pokemon.id === p.id).length > 0;

  //     if (!monExists) {
  //       state = [...state, pokemon];
  //       state.sort((a, b) => {
  //         return a.id - b.id;
  //       });
  //     }
  //     // console.log("state", state);

  //     return state;
  //   });
  //   getWildPokemon();
  // };
  // // console.log("wildPokemon", wildPokemon);

  // const releasePokemon = id => {
  //   setPokedex(state => state.filter(p => p.id !== id));
  // };

  // const handleFindPokemon = event => {
  //   let inputValue = event.target.value.trim();
  //   if (event.keyCode !== 13 || inputValue === "") return;
  //   getAllPokemonName(inputValue);
  //   event.target.value = "";
  // };

  const getAllPokemonName = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
      .then(response => {
        console.log("getAllPokemonName", response.data);
        setPokeName(response.data.results);
      });
  };
  const getAll = name => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(response => {
      // console.log("getAll", response.data);
      setPokemon(state => [...state, response.data]);
    });
  };

  const filteringName = () => {
    console.log("pokeName", pokeName);

    pokeName.map(el => {
      return getAll(el.name);
    });
  };
  console.log("pokemonAll", pokemonAll);

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokemon Table test</h1>

        {/* <input type="number" onKeyDown={handleFindPokemon} /> */}
        <button onClick={filteringName}>asdfa</button>
      </header>
      <section className="pokedex">
        <h2>Pokedex</h2>
        <div className="pokedex-list">
          {pokemonAll.map(pokemon => (
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
            </div>
          ))}
        </div>
      </section>
      {/* <section className="wild-pokemon">
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
      </section> */}
      {/* <section className="pokedex">
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
              <button
                className="remove"
                onClick={() => releasePokemon(pokemon.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}

export default App;
