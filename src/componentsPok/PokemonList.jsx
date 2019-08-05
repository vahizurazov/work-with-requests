import React, { Component } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }

  render() {
    console.log("pokemon", this.state.pokemon);

    return (
      <>
        {this.state.pokemon ? (
          <div className="column wrap-card">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  }
}

export default PokemonList;
