import React, { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";

// import Loader from "./assets/images/loader.gif";

function NewPokemonPage() {
  const [urlChain, setUrlChain] = useState([]);
  const [wildPokemon, setwildPokemon] = useState([]);
  const [next, setNext] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getUrlChain();
  }, []);

  const getUrlChain = () => {
    const baseUrl =
      "https://pokeapi.co/api/v2/evolution-chain/?offset=0&limit=10";
    axios.get(baseUrl).then(res => {
      console.log("getUrlChain", res.data);
      setUrlChain(res.data.results);
      setNext(res.data.next);
    });
  };
  // console.log("next", next);

  const getAllPokemon = () => {
    urlChain.map(item => {
      console.log("item.url", item.url);
      axios.get(item.url).then(res => {
        console.log("getAllPokemon", res.data);

        setwildPokemon(state => [...state, res.data]);
      });
    });
  };
  const getNext = () => {
    console.log("next", next);
    axios.get(next).then(res => {
      setUrlChain(res.data.results);
      setNext(res.data.next);
      setwildPokemon([]);
      getAllPokemon();
    });
  };

  const getInfo = () => {
    if (isShow) return setIsShow(false);
    setIsShow(true);
  };
  // console.log("urlChain", urlChain);

  console.log("wildPokemon>>>>>>>>", wildPokemon);

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
            <p className="pokemon-name">{pokemon.chain.species.name}</p>
            {isShow ? <div>lakshbdflkhsdab</div> : null}
            <button onClick={getInfo} type="button" className="btn btn-info">
              Info
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={getAllPokemon}>Show Pokemon</button> */}
      <button type="button" className="btn btn-primary" onClick={getNext}>
        Next 10
      </button>
    </div>
  );
}

export default NewPokemonPage;
