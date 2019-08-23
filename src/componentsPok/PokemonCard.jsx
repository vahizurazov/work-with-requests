import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class PokemonCard extends Component {
  render() {
    console.log("INFO", this.props);
    // const { evolutionPoke } = this.props;
    console.log("this.props", this.props);

    return (
      <div className="d-flex flex-column">
        <div>
          Name: <span>{this.props.name}</span>
        </div>
        <div className="pokemon">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              this.props.id
            }.png`}
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
