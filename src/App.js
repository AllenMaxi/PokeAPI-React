import React, { useState, useEffect } from 'react';
import PokemonThumbnails from './component/PokemonThumbnails';

function App() {
const [allPokemons, setAllPokemons] = useState([])
const [loadMore, setloadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

const getAllPokemons = async() => {
  const res = await fetch(loadMore);
  const data = await res.json();
  setloadMore(data.next);

  function createPokemonObject(result) {
 result.forEach(async(el) => {
   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`);
   const data = await res.json();
   setAllPokemons(currentList => [...currentList, data]);
   
 })
  }
createPokemonObject(data.results)
await console.log(allPokemons);
};
useEffect(() => {
  getAllPokemons();
}, [])
  return (
    <div className="app-contaner">
    <h1>Pokemon Evolution</h1>
    <div className="pokemon-container">
      <div className="all-container">
        {allPokemons.length===0 ? "Cargando..."
        :allPokemons.map( (pokemonStats, index) => 
          <PokemonThumbnails
            key={index}
            id={pokemonStats.id}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name}
            type={pokemonStats.types[0].type.name}
          />)}
        
      </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
    </div>
  </div>
  );
}

export default App;
