import React, { useState, useEffect } from "react";
import axios from "axios";
// import Loader from "./assets/images/loader.gif";

function NewPokemonPage() {
  const [urlChain, seturlChain] = useState([]);

  useEffect(() => {
    getUrlChain();
  }, []);

  const getUrlChain = url => {
    const baseUrl = "https://pokeapi.co/api/v2/evolution-chain/";
    axios.get(baseUrl).then(response => {
      //   console.log("response.data", response.data);
      seturlChain(response.data);
    });
  };
  //   console.log("urlChain", urlChain);

  return (
    <div>
      {/* <button onClick={() => getUrlChain(urlChain.next)}>Next</button> */}
    </div>
  );
}

export default NewPokemonPage;
