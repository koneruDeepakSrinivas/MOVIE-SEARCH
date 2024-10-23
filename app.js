import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_OMDB_API_KEY"; // Replace with your OMDB API key

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
        setError(""); // clear error
      } else {
        setError("No movies found. Try a different search.");
        setMovies([]);
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <button
        onClick={searchMovies}
        style={{ padding: "10px 20px", marginLeft: "10px", fontSize: "16px" }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.imdbID} style={{ marginBottom: "20px" }}>
              <h3>{movie.Title}</h3>
              <img src={movie.Poster} alt={movie.Title} style={{ width: "200px" }} />
              <p>{movie.Year}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
