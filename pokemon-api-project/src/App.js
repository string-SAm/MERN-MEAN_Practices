import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemonData = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      if (!res.ok) {
        throw new Error('Sorry, couldn\'t fetch data');
      }

      const data = await res.json();
      setPokemonData(data);
      setError(null);
    } catch (error) {
      setPokemonData(null);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        
        if (!res.ok) {
          throw new Error('Sorry, couldn\'t fetch the Pokemon list');
        }

        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  const handleInputChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <input
        type='text'
        placeholder='Enter Name'
        value={pokemonName}
        onChange={handleInputChange}
      />
      <button onClick={fetchPokemonData}>Search</button>
      <br />
      <div>
        {pokemonData && (
          <>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <p>Name: {pokemonData.name}</p>
            <p>Height: {pokemonData.height}</p>
            <p>Weight: {pokemonData.weight}</p>
          </>
        )}
        {error && <p>Error: {error}</p>}
      </div>

      <h2>Pokemon List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.name}</td>
              <td>{pokemon.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
