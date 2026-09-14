import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("movieFavorites") || "[]"
    );

    setFavorites(savedFavorites);
  }, []);

  return (
    <main className="home">
      <Link className="back-link" to="/">
        ← Back to Home
      </Link>

      <h1 className="favorites-title">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">
          No favorite movies yet.
        </p>
      ) : (
        <div className="movie-grid">
         {favorites.map((movie) => (
            <MovieCard
                key={movie.imdbID}
                movie={movie}
                onFavoriteChange={() => {
                const updatedFavorites = JSON.parse(
                    localStorage.getItem("movieFavorites") || "[]"
                );

                setFavorites(updatedFavorites);
                }}
            />
            ))}
        </div>
      )}
    </main>
  );
}

export default FavoritesPage;