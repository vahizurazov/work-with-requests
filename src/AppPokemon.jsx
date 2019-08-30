import React, { useState } from "react";

import NewPokemonPage from "./componentsPok/NewPokemonPage";

const AppPokemon = () => {
  const [urlChainCount, setUrlChainCount] = useState(10);
  const changePokemonUrlChainCount = e => setUrlChainCount(parseInt(e.target.value));

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokemon Table test</h1>
        <label>
          Select pokemon count
          <select className="custom-select" onChange={changePokemonUrlChainCount}>
            <option value="10" defaultValue>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </label>
      </header>

      <NewPokemonPage urlChainCount={urlChainCount}/>
    </div>
  );
}

export default AppPokemon;
