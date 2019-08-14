import React, { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";

import PokemonList from "./PokemonList";

function NewPokemonPage() {
  const [urlChain, setUrlChain] = useState([]);
  const [wildPokemon, setwildPokemon] = useState([]);
  const [next, setNext] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    getUrlChain();
  }, []);

  const getUrlChain = () => {
    const baseUrl =
      "https://pokeapi.co/api/v2/evolution-chain/?offset=0&limit=10";
    axios.get(baseUrl).then(res => {
      // console.log("getUrlChain", res.data);
      setUrlChain(res.data.results);
      setNext(res.data.next);
    });
  };
  console.log("allPokemon", allPokemon);

  const getAllPokemon = () => {
    urlChain.map(item => {
      // console.log("item.url", item.url);
      axios.get(item.url).then(res => {
        // console.log("getAllPokemon", res.data);

        setwildPokemon(state => [...state, res.data]);
        setAllPokemon(state => [...state, res.data]);
      });
    });
  };
  const getNext = () => {
    console.log("next", next);
    setIsloading(true);
    axios.get(next).then(res => {
      setUrlChain(res.data.results);

      setNext(res.data.next);
      setwildPokemon([]);
      getAllPokemon();
      setIsloading(false);
    });
  };

  const getInfo = (name, e) => {
    // if (e.target.parentNode.childNodes[1].innerText === name) {
    if (isShow) return setIsShow(false);
    setIsShow(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => {
      console.log("setPokemonInfo", res.data);
      setPokemonInfo(res.data);
    });
    // }
    // console.log("e.target", e.target.parentNode.childNodes[1].innerText);
  };
  // console.log("urlChain", urlChain);

  // console.log("pokemonInfo>>>>>", pokemonInfo);
  // console.log("pokemon", wildPokemon);

  return (
    <div>
      <div className="pokedex-list">
        {wildPokemon.map(pokemon => (
          <PokemonList
            pokemon={pokemon}
            isShow={isShow}
            isLoading={isLoading}
            getInfo={getInfo}
            pokemonInfo={pokemonInfo}
          />
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
