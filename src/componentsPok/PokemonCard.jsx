import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class PokemonCard extends Component {
  state = {
    pokemonEvolutionPicsId: [],
    pokemonInfo: {}
  };

  getPokemonInfo = name => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => {
      this.setState({ pokemonInfo: res.data });
    });
    // axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`).then(res => {
    //   console.log("IDDDDDDDDDDDDDD", res.data);
    //   setEvolutionPoke(res.data);
    // });
  };

  componentDidMount() {
    this.getPokemonInfo(this.props.pokemon.chain.species.name);
    const urlId = this.state.pokemonInfo.id;
    if (urlId === undefined) return;

    axios
      .get(`https://pokeapi.co/api/v2/evolution-chain/${urlId}/`)
      .then(res => {
        console.log("res", res.data.chain);
        const pokemonEvolutionPicsId = [];
        const getPokemonEvolutionIds = arr => {
          arr.forEach(el => {
            const evolutionId = el.species.url.match(/\/([0-9]{1,})\//)[1];
            if (evolutionId) {
              pokemonEvolutionPicsId.push(evolutionId);
            }
            if (el.evolves_to.length) {
              getPokemonEvolutionIds(el.evolves_to);
            }
          });
        };

        getPokemonEvolutionIds(res.data.chain.evolves_to);
        this.setState({ pokemonEvolutionPicsId });
      });
    console.log("Mount");
  }

  getPokemonEvolutionInfo = () => {
    return;
  };

  render() {
    const { pokemonInfo } = this.state;

    return (
      <div className="d-flex flex-column">
        <div className="namePok">
          <span>{String(pokemonInfo.name).toUpperCase()}</span>
        </div>
        <div className="pokemon">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`}
            alt="sd"
            className="sprite"
          />

          {this.state.pokemonEvolutionPicsId.map(id => (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt="sd"
              className="sprite"
              key={id}
            />
          ))}
        </div>

        <div className="wrap">
          <p> Base experience</p>
          <div className="progress d-flex">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: +pokemonInfo.base_experience + "%" }}
              aria-valuenow={pokemonInfo.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {pokemonInfo.base_experience}%
            </div>
          </div>
        </div>
        <div className="wrap">
          <p>Type</p>
          <div className="progress d-flex">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: +2 + "%" }}
              aria-valuenow={pokemonInfo.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {pokemonInfo.base_experience}%
            </div>
          </div>
        </div>
        <div className="wrap">
          <p> Base experience</p>
          <div className="progress d-flex">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: +pokemonInfo.base_experience + "%" }}
              aria-valuenow={pokemonInfo.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {pokemonInfo.base_experience}%
            </div>
          </div>
        </div>
        <button onClick={this.getPokemonEvolutionInfo}>More info</button>
      </div>
    );
  }
}

export default PokemonCard;
