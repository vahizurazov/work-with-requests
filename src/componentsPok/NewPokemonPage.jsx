import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";

import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";

class NewPokemonPage extends Component {
  state = {
    urlChain: [],
    wildPokemon: [],
    isShow: false,
    pokemonInfo: [],
    isLoading: false,
    allPokemon: [],
    evolutionPoke: [],
    fetchedPokemonCount: 0,
    isDataReady: true
  };

  // useEffect(() => {
  //   getUrlChain();
  // }, [props.urlChainCount]);

  // useEffect(() => {
  //   getAllPokemon();
  // }, [urlChain]);
  componentDidMount() {
    this.getUrlChain();
    // this.getAllPokemon();
  }

  getUrlChain = () => {
    const urlChainCount = this.props.urlChainCount;
    const baseUrl = `https://pokeapi.co/api/v2/evolution-chain/?offset=${this.state.fetchedPokemonCount}&limit=${urlChainCount}`;
    axios.get(baseUrl).then(res => {
      this.setState({ urlChain: res.data.results });
      this.setState({
        fetchedPokemonCount: this.state.fetchedPokemonCount + urlChainCount
      });
      this.getAllPokemon();
    });
  };
  getAllPokemon = () => {
    // if (this.state.isDataReady) this.setState({ IsDataReady: false });
    this.state.urlChain.map(item => {
      axios.get(item.url).then(res => {
        console.log("resgetAllPokemon", res.data);
        this.setState(prevState => ({
          wildPokemon: [...prevState.wildPokemon, res.data]
        }));

        // setAllPokemon(state => [...state, res.data]);
        // this.setState({ IsDataReady: true });
      });
    });
  };
  // console.log(this.props);

  getNext = () => {
    // // console.log("next", next);
    // if (this.state.isShow) return;
    // this.setState({Isloading: true})
    // const baseUrl = `https://pokeapi.co/api/v2/evolution-chain/?offset=${this.state.fetchedPokemonCount}&limit=${this.props.urlChainCount}`;
    // // axios.get(next).then(res => {
    // axios.get(baseUrl).then(res => {
    //   setUrlChain(res.data.results);
    //   // setNext(res.data.next);
    //   setwildPokemon([]);
    //   // getAllPokemon();
    //   setIsloading(false);
    //   setFetchedPokemonCount(state => state + this.props.urlChainCount);
    // });
  };

  // console.log("urlChain", urlChain);

  getInfo = (name, id) => {
    // if (isShow) return setIsShow(false);
    console.log("---------names", name);

    this.setState({ IsShow: true });
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => {
      // setPokemonInfo(res.data);
    });
  };
  render() {
    console.log("this.state", this.state.isDataReady);

    return (
      <Router>
        <div className="pokedex-list">
          {/* {console.log('render')} */}
          {this.state.isDataReady
            ? this.state.wildPokemon.map(pokemon => (
                <>
                  <Route
                    path="/"
                    exact
                    component={() => (
                      <PokemonList
                        pokemon={pokemon}
                        isShow={this.state.isShow}
                        isLoading={this.state.isLoading}
                        key={pokemon.id}
                      />
                    )}
                  />
                  <Route
                    path={`/${pokemon.chain.species.name}`}
                    component={() => (
                      <PokemonCard
                        getInfo={this.getInfo}
                        pokemon={pokemon}
                        {...this.state.pokemonInfo}
                        key={pokemon.id}
                      />
                    )}
                  />
                </>
              ))
            : null}
        </div>
        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getNext}
          >
            Next 10
          </button>
          <Link type="button" className="btn btn-primary" to="/">
            Back
          </Link>
        </div>
      </Router>
    );
  }
}

export default NewPokemonPage;
