import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      "https://pokeapi.co/api/v2/evolution-chain/?offset=0&limit=3";
    axios.get(baseUrl).then(res => {
      setUrlChain(res.data.results);
      setNext(res.data.next);
    });
  };
  const getAllPokemon = () => {
    urlChain.map(item => {
      axios.get(item.url).then(res => {
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
    if (isShow) return setIsShow(false);
    setIsShow(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => {
      console.log("setPokemonInfo", res.data);
      setPokemonInfo(res.data);
    });
  };

  return (
    <Router>
      <div className="pokedex-list">
        {wildPokemon.map(pokemon => (
          // <Route Route path="/about" key={pokemon.id} component={PokemonList}>
          <PokemonList
            pokemon={pokemon}
            isShow={isShow}
            isLoading={isLoading}
            getInfo={getInfo}
            pokemonInfo={pokemonInfo}
            key={pokemon.id}
          />
          // </Route>
        ))}
      </div>

      {/* <button onClick={getAllPokemon}>Show Pokemon</button> */}
      <button type="button" className="btn btn-primary" onClick={getNext}>
        Next 10
      </button>
    </Router>
  );
}

export default NewPokemonPage;
