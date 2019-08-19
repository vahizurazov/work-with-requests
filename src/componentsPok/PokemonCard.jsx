import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class PokemonCard extends Component {
  render() {
    console.log("INFO", this.props);

    return (
      <div className="d-flex flex-column">
        <div>
          Name: <span>{this.props.name}</span>
        </div>
        <div className="progress ">
          <div>Base experience</div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: +this.props.base_experience + "%" }}
            aria-valuenow={this.props.base_experience}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="progress ">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: +this.props.height + "%" }}
            aria-valuenow={this.props.height}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="progress ">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: +this.props.weight + "%" }}
            aria-valuenow={this.props.weight}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    );
  }
}

export default PokemonCard;
