import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateForm = props => {
    console.log(props)
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "director") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        // res.data
        props.setMovieList(res.data);
        push(`/movies/:id${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='movie-card' >
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;