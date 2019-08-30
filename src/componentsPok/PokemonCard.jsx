import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class PokemonCard extends Component {
  componentDidMount() {
    const urlId = this.props.id;
    if (urlId === undefined) return;
    axios
      .get(`https://pokeapi.co/api/v2/evolution-chain/${urlId}/`)
      .then(res => {
        console.log("res", res.data.chain.evolves_to);

        // console.log("res.data.results", res.data.results);
      });
  }

  render() {
    console.log("INFO", this.props);

    console.log(this.props.types);

    return (
      <div className="d-flex flex-column">
        <div>
          Name: <span>{this.props.name}</span>
        </div>
        <div className="pokemon">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`}
            alt="sd"
            className="sprite"
          />
        </div>

        <div className="wrap">
          <p> Base experience</p>
          <div className="progress d-flex">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: +this.props.base_experience + "%" }}
              aria-valuenow={this.props.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {this.props.base_experience}%
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
              aria-valuenow={this.props.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {this.props.base_experience}%
            </div>
          </div>
        </div>
        <div className="wrap">
          <p> Base experience</p>
          <div className="progress d-flex">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: +this.props.base_experience + "%" }}
              aria-valuenow={this.props.base_experience}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {this.props.base_experience}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
