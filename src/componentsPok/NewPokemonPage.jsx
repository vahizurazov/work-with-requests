import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
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
  const [evolutionPoke, setEvolutionPoke] = useState([]);

  useEffect(() => {
    getUrlChain();
  }, []);

  const getUrlChain = () => {
    const baseUrl =
      "https://pokeapi.co/api/v2/evolution-chain/?offset=0&limit=10";
    axios.get(baseUrl).then(res => {
      // console.log("res.data.results", res.data.results);

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
  // console.log(this.props);

  const getNext = () => {
    console.log("next", next);
    if (isShow) return;
    setIsloading(true);
    axios.get(next).then(res => {
      setUrlChain(res.data.results);
      setNext(res.data.next);
      setwildPokemon([]);
      getAllPokemon();
      setIsloading(false);
    });
  };

  // console.log("urlChain", urlChain);

  const getInfo = (name, id) => {
    // if (isShow) return setIsShow(false);
    console.log("id", id);

    setIsShow(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => {
      // console.log("setPokemonInfo", res.data);
      setPokemonInfo(res.data);
    });
    // axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`).then(res => {
    //   console.log("IDDDDDDDDDDDDDD", res.data);
    //   setEvolutionPoke(res.data);
    // });
  };

  const backPage = () => {
    setIsShow(false);
  };

  return (
    <Router>
      <div className="pokedex-list">
        {wildPokemon.map(pokemon => (
          <PokemonList
            pokemon={pokemon}
            isShow={isShow}
            isLoading={isLoading}
            getInfo={getInfo}
            pokemonInfo={pokemonInfo}
            // evolutionPoke={evolutionPoke}
            key={pokemon.id}
          />
        ))}
      </div>
      <div className="d-flex justify-content-around">
        <button type="button" className="btn btn-primary" onClick={getNext}>
          Next 10
        </button>
        <button type="button" className="btn btn-primary" onClick={backPage}>
          Back
        </button>
      </div>
    </Router>
  );
}

export default NewPokemonPage;
