import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieError, setMovieError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setMovieError(false);
    try {
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
    } catch (error) {
      console.log(error.message);
      setMovieError(error.message);
    }
    setIsLoading(false);
  }
  // componentDidMount()
  useEffect(() => {
    console.log("useEffect ran");
    fetchMoviesHandler();
  }, []);

  // panaudoti kintamaji arba funkcija ir atvaizduoti klaidas arba loading arba ka reikia
  let content = <p>No movies at the moment </p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (movieError) content = <p>{movieError}</p>;

  if (isLoading) content = <p>Loading ...</p>;

  // const showContent = () => {
  //   if (!isLoading && movies.length > 0) return <MoviesList movies={movies} />;
  //   if (!isLoading && movies.length === 0 && !movieError)
  //     return <p>No movies at the moment </p>;
  //   if (movieError) return <p>{movieError}</p>;
  //   if (isLoading) return <p>Loading ...</p>;
  // };
  return (
    <React.Fragment>
      <section>
        <button disabled={isLoading} onClick={fetchMoviesHandler}>
          {isLoading ? "Loading" : "Fetch Movies"}
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
