import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, UpdateForm, movieList, setMovieList }) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const item = movieList.find(
    thing => `${thing.id}` === params.id
    );

  // if (movieList.length || !item) {
  //   return <h2>Loading item data...</h2>;
  // }


  const deleteMovie = e => {
    e.preventDefault();
    console.log('I got pushed')

    axios
      .delete(`http://localhost:5000/api/movies/$${item.id}`)
      .then(res => {
        console.log(res.data)
        push("/");

        const newItems = setMovieList(movieList.filter(v => `${v.id}` !== res.data))
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className='update-button' onClick={() => push(`/update-movie/${params.id}`)}>
        update
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        delete
      </div>
    </div>
  );
}

export default Movie;
