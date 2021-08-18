import React, { useState } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];
  /*
  {
    created: "2014-12-10T14:23:31.880000Z"
    director: "George Lucas"
    edited: "2014-12-20T19:49:45.256000Z"
    episode_id: 4
    opening_crawl: "It is a 
    release_date: "1977-05-25"
    title: "A New Hope"
  }
  */

  const [movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    const { data } = await axios.get("https://swapi.dev/api/films");
    console.log(data.results);
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
