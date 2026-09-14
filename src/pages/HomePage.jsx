import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { searchMovies, getMovieDetails } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const featuredIds = [
      "tt1375666",
      "tt0816692",
      "tt0468569",
      "tt4154796",
      "tt10872600",
      "tt0371746",
    ];

    async function loadFeaturedMovies() {
      try {
        const movies = await Promise.all(
          featuredIds.map((id) => getMovieDetails(id))
        );

        setFeaturedMovies(movies);
      } catch (error) {
        console.error("Featured movies error:", error);
      }
    }

    loadFeaturedMovies();
  }, []);
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");
      setMovies([]);

      const data = await searchMovies(query);

      setMovies(data.results || []);
    } catch (err) {
      console.error("API ERROR:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <h1>Find Your Favorite Movies</h1>
         <p>Search for movies and explore their details.</p>

          <SearchBar
          onSearch={handleSearch}
          loading={loading}
          />
        </section>
          {movies.length === 0 && !loading && !error && featuredMovies.length > 0 && (
        <section className="featured-section">
          <h2>Featured Movies</h2>

          <div className="movie-grid">
          {featuredMovies.map((movie) => (
          <MovieCard
          key={movie.imdbID}
          movie={movie}
          />
          ))}
            </div>
           </section>
        )}
        {loading && (
          <div className="loading-container">
          <div className="spinner"></div>
           <p>Searching movies...</p>
          </div>
        )}
        {error && (
         <p className="error-message">
           No movies found. Please try another movie title.
            </p>
        )}
        {!loading && !error && movies.length > 0 && (
        <p className="results-count">
        Found {movies.length} movies
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