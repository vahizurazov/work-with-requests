import React, { useState, useEffect } from "react";
import axios from "axios";
// import Loader from "./assets/images/loader.gif";

function NewPokemonPage() {
  const [urlChain, seturlChain] = useState([]);
  const [wildPokemon, setwildPokemon] = useState([]);

  useEffect(() => {
    getUrlChain();
  }, []);

  const getUrlChain = url => {
    const baseUrl = "https://pokeapi.co/api/v2/evolution-chain/";
    axios.get(baseUrl).then(response => {
      console.log("response.data", response.data.results);
      seturlChain(response.data.results);
    });
  };
  //   console.log("urlChain", urlChain);

  const getAllPokemon = () => {
    urlChain.map(item => {
      console.log("item.url", item.url);
      axios.get(item.url).then(res => {
        console.log("res.data", res.data);

        setwildPokemon(state => [...state, res.data]);
      });
    });
  };

  console.log(">>>>>>>>", wildPokemon);

  return (
    <div>
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
          </div>
        ))}
      </div>
      <button onClick={getAllPokemon}>Show Pokemon</button>
    </div>
  );
}

export default NewPokemonPage;
