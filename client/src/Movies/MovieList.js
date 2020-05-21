import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Axios from "axios";

function MovieList({ movies, setMovieList }) {

  useEffect(() => {
    Axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res =>    {
        console.log(res.data)
        setMovieList(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
