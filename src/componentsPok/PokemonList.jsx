import React, { Component } from "react";
import axios from "axios";
import Loader from "../assets/images/loader.gif";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";

// import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
  render() {
    // console.log("this.props", this.props);
    const { isLoading, isShow, pokemon } = this.props;
    // console.log("pokemonInfo", pokemonInfo);
    // console.log(pokemon, '--- pokemon');
    return (
      <>
        {/* {isShow ? ( */}
        {/* <Route
            path={`/${pokemon.chain.species.name}`}
            component={() => <PokemonCard pokemon={pokemon} />}
          /> */}
        {/* ) : ( */}
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
          <Link
            to={`/${pokemon.chain.species.name}`}
            // onClick={e => getInfo(pokemon.chain.species.name, e)}
            type="button"
            className="btn btn-info"
          >
            Info
          </Link>
        </div>
        {/* )} */}
      </>
    );
  }
}

export default PokemonList;
