import React, { useState, useEffect } from "react";
import axios from "axios";
// import NewPokemonPage from "./componentsPok/NewPokemonPage";
// import Loader from "./assets/images/loader.gif";

function AppPokemon() {
  // const [pokedex, setPokedex] = useState([]);
  // const [pokeName, setPokeName] = useState([]);

  const [wildPokemon, setWildPokemon] = useState([]);
  const [pokemonAll, setPokemon] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getWildPokemon();
  }, []);

  const getWildPokemon = () => {
    const hundredPokemon = () => {
      var start = 1;
      var result = [];
      while (start <= 20) {
        result.push(start++);
      }
      return result;
    };
    const arr = hundredPokemon();
    arr.map(item => {
      axios
        .get(`https://pokeapi.co/api/v2/evolution-chain/${item}/`)
        .then(response => {
          // console.log("response.data", response.data);
          setWildPokemon(state => [...state, response.data]);
        });
    });
  };

  // console.log("wildPokemon", wildPokemon);

  const getAll = name => {
    setIsShow(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(response => {
      // console.log("getAll", response.data);
      setPokemon(response.data);
      // setIsShow(false);
    });
  };

  // console.log("pokemonAll", pokemonAll);

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokemon Table test</h1>
        {/* <button onClick={filteringName}>asdfa</button> */}
      </header>
      <div className="pokedex">
        <div className="pokedex-list">
          {wildPokemon.map(pokemon => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.chain.species.url.match(/\/([0-9]{1,})\//)[1]
                }.png`}
                alt="sd"
                className="sprite"
              />
              <p>{pokemon.chain.species.url.match(/\/([0-9]{1,})\//)[1]}</p>
              <p className="pokemon-name">{pokemon.chain.species.name}</p>
              <button
                href="#"
                onClick={() => getAll(pokemon.chain.evolves_to[0].species.name)}
              >
                Next evolution
              </button>
            </div>
          ))}
        </div>
      </div>
      {isShow ? (
        <div>
          <div className="pokeCard" key={pokemonAll.id}>
            <img
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                pokemonAll.id +
                ".png"
              }
              alt="sd"
              className="sprite"
            />
            <p className="pokemon-name">{pokemonAll.name}</p>
          </div>
        </div>
      ) : null}

      {/* <NewPokemonPage /> */}

      {/* <section className="pokedex">
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
      </section> */}
    </div>
  );
}

export default AppPokemon;
