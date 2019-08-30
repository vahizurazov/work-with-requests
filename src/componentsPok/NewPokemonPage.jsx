import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";

import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";


const NewPokemonPage = props => {
  const [urlChain, setUrlChain] = useState([]);
  const [wildPokemon, setwildPokemon] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const [evolutionPoke, setEvolutionPoke] = useState([]);
  const [fetchedPokemonCount, setFetchedPokemonCount] = useState(0);
  const [isDataReady, setIsDataReady] = useState(false);


  useEffect(() => {
    getUrlChain();
  }, [props.urlChainCount]);

  useEffect(() => {
    getAllPokemon();
  }, [urlChain]);

  const getUrlChain = () => {
    const urlChainCount = props.urlChainCount;
    const baseUrl = `https://pokeapi.co/api/v2/evolution-chain/?offset=${fetchedPokemonCount}&limit=${urlChainCount}`;
    axios.get(baseUrl).then(res => {
      // console.log("res.data.results", res.data);

      setUrlChain(res.data.results);
      setFetchedPokemonCount(state => state + urlChainCount);
      // setNext(res.data.next);
    });
  };
  const getAllPokemon = () => {
    if (isDataReady) setIsDataReady(false);
    urlChain.map(item => {
      axios.get(item.url).then(res => {
        setwildPokemon(state => [...state, res.data]);
        setAllPokemon(state => [...state, res.data]);
        setIsDataReady(true);
      });
    });
  };
  // console.log(this.props);

  const getNext = () => {
    // console.log("next", next);
    if (isShow) return;
    setIsloading(true);
    const baseUrl = `https://pokeapi.co/api/v2/evolution-chain/?offset=${fetchedPokemonCount}&limit=${
      props.urlChainCount
    }`;
    // axios.get(next).then(res => {
    axios.get(baseUrl).then(res => {
      setUrlChain(res.data.results);
      // setNext(res.data.next);
      setwildPokemon([]);
      // getAllPokemon();
      setIsloading(false);
      setFetchedPokemonCount(state => state + props.urlChainCount);
    });
  };

  // console.log("urlChain", urlChain);

  const getInfo = (name, id) => {
    // if (isShow) return setIsShow(false);
    console.log("---------names", name);

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

  return (
    <Router>
      <div className="pokedex-list">
        {console.log('render')}
        {isDataReady ? wildPokemon.map(pokemon => (
          <>
          <Route 
            path='/'
            exact
            component={() => (
              <PokemonList
                pokemon={pokemon}
                isShow={isShow}
                isLoading={isLoading}
                key={pokemon.id}
              />
            )}
            />
          <Route
            path={`/${pokemon.chain.species.name}`}
            component={() => (
              <PokemonCard getInfo={getInfo} pokemon={pokemon} {...pokemonInfo} />
            )}
          />
          </>
        )): null}
      </div>
      <div className="d-flex justify-content-around">
        <button type="button" className="btn btn-primary" onClick={getNext}>
          Next 10
        </button>
        <Link type="button" className="btn btn-primary" to="/">
          Back
        </Link>
      </div>
    </Router>
  );
};

export default NewPokemonPage;
