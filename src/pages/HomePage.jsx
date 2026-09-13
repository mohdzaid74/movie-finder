import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(query);

      setMovies(data.results || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        <h1>Find Your Favorite Movies</h1>
        <p>Search for movies and explore their details.</p>

        <SearchBar onSearch={handleSearch} />

        {loading && (<p className="loading-message">Loading movies...</p>)}
        {error && (
         <p className="error-message">
           No movies found. Please try another movie title.
            </p>
        )}

        
        {!loading && !error && movies.length === 0 && (<p className="empty-message"> No movies found. Try searching another movie.</p>)} 
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;