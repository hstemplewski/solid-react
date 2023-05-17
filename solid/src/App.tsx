import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import styles from "./App.module.css";

const fetchCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return data;
};

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const handleIncrease = () => setCount(count() + 1);

  // FIRST OPTION
  const [characters, setCharacters] = createSignal<any[]>([]);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    setLoading(true);
    fetchCharacters().then((data) => {
      setCharacters(data.results);
      setLoading(false);
    });
  });

  // SECOND OPTION
  // const [characters] = createResource<any>(fetchCharacters);

  // FIRST OPTION
  if (loading()) {
    return <div>Loading...</div>;
  }

  console.log("render SOLID");
  return (
    <>
      <h1 class={styles.header}>EXAMPLE</h1>
      <p>{count()}</p>
      <button onClick={handleIncrease}>INCREASE</button>
      {/* FIRST OPTION */}
      <div class={styles.App}>
        {characters().map((character) => (
          <div>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
      {/* SECOND OPTION */}
      {/* <Show when={!characters.loading} fallback={<div>loading...</div>}>
        <div class={styles.App}>
          {characters()?.results?.map((character) => (
            <div>
              <h1>{character.name}</h1>
              <img src={character.image} alt={character.name} />
            </div>
          ))}
        </div>
      </Show> */}
    </>
  );
};

export default App;
