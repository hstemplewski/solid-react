import { useEffect, useState } from "react";
import "./App.css";

const fetchCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return data;
};

const App = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => setCount(count + 1);

  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCharacters().then((data) => {
      setCharacters(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("render REACT");
  return (
    <>
      <h1>EXAMPLE</h1>
      <p>{count}</p>
      <button onClick={handleIncrease}>INCREASE</button>
      <div className="App">
        {characters.map((character) => (
          <div key={character.id}>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
