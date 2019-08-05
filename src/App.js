import React, { Component } from "react";
import PokemonList from "./componentsPok/PokemonList";
// import Loader from "./assets/images/loader.gif";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      items: [],
      isLoading: false
    };
    console.log(this.props);
  }

  // componentDidMount() {
  //   const urlApi = "https://pokeapi.co/api/v2/";
  //   this.setState({ isLoading: true });
  //   fetch(urlApi + "pokemon/")
  //     .then(response => response.json())
  //     .then(data => this.setState({ isLoading: false, data: data.results }))
  //     // .then(this.getRes)
  //     .catch("ERROR");
  // }

  render() {
    return (
      <div className="App">
        <header className="container" id="container1">
          <PokemonList />
        </header>
      </div>
    );
  }
}

export default App;
