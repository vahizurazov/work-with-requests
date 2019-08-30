import React from "react";

import NewPokemonPage from "./componentsPok/NewPokemonPage";

function AppPokemon() {
  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokemon Table test</h1>
      </header>

      <NewPokemonPage />
    </div>
  );
}

export default AppPokemon;
