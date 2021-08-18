import React, { useState } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const { data } = await axios.get("https://swapi.dev/api/films");

    // perdaryti duomenis i mums rekalingastruktura
    const moviesTransformed = data.results.map((mv) => {
      return {
        id: mv.episode_id,
        title: mv.title,
        openingText: mv.opening_crawl,
        releaseDate: mv.release_date,
      };
    });
    setMovies(moviesTransformed);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button disabled={isLoading} onClick={fetchMoviesHandler}>
          {isLoading ? "Loading" : "Fetch Movies"}
        </button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies at the moment </p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
