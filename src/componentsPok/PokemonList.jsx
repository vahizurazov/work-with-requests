import React, { Component } from "react";
// import axios from "axios";
import Loader from "../assets/images/loader.gif";

// import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null
  };

  render() {
    console.log("this.props", this.props);
    const { isLoading, isShow, pokemon, getInfo, pokemonInfo } = this.props;

    return (
      <>
        <div className="pokemon" key={pokemon.id}>
          {!isLoading ? (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.chain.species.url.match(/\/([0-9]{1,})\//)[1]
              }.png`}
              alt="sd"
              className="sprite"
            />
          ) : (
            <img src={Loader} alt="sd" />
          )}

          <p className="pokemon-name">{pokemon.chain.species.name}</p>
          {isShow ? (
            <div>
              <ul>
                <li>Base Experience: {pokemonInfo.base_experience}</li>
                <li>Height: {pokemonInfo.height}</li>
                <li>Weight: {pokemonInfo.weight}</li>
                <li>ID: {pokemonInfo.id}</li>
              </ul>
            </div>
          ) : null}
          <button
            onClick={e => getInfo(pokemon.chain.species.name, e)}
            type="button"
            className="btn btn-info"
          >
            Info
          </button>
        </div>
      </>
    );
  }
}

export default PokemonList;
