import React, { Component } from "react";
import axios from "axios";

// import Loader from "./assets/images/loader.gif";

class NewPokemonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlChain: [],
      wildPokemon: []
    };
  }

  componentDidMount() {
    this.getUrlChain();
    this.getAllPokemon();
  }
  getUrlChain = url => {
    const baseUrl = "https://pokeapi.co/api/v2/evolution-chain/";
    axios.get(baseUrl).then(res => {
      // console.log("res.data", res.data);
      this.setState({ urlChain: res.data.results });
    });
  };

  getAllPokemon = () => {
    console.log("urlChain>>>>", this.state.urlChain);

    this.state.urlChain.map(item => {
      // console.log("item.url", item.url);
      axios.get(item.url).then(res => {
        console.log("res.data", res.data);
        this.setState({ wildPokemon: [...this.state.wildPokemon, res.data] });
      });
    });
  };

  render() {
    const { urlChain, wildPokemon } = this.state;
    console.log(">>>>>>>", wildPokemon);

    return (
      <div>
        <div className="pokedex-list">
          {/* {this.wildPokemon.map(pokemon => ( */}
          <div className="pokemon" key={wildPokemon.id}>
            {/* <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.chain.species.url.match(/\/([0-9]{1,})\//)[1]
              }.png`}
              alt="sd"
              className="sprite"
            /> */}
            {/* <p>{wildPokemon.chain.species.url.match(/\/([0-9]{1,})\//)[1]}</p> */}
            {/* <p className="pokemon-name">{wildPokemon.chain.species.name}</p> */}
          </div>
          {/* // ))} */}
        </div>
        <button onClick={this.getAllPokemon}>Show Pokemon</button>
      </div>
    );
  }
}

export default NewPokemonPage;
