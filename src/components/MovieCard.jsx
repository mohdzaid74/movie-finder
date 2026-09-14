import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, onFavoriteChange }) {
  const [imageError, setImageError] = useState(false);

  const hasPoster =
    movie.Poster && movie.Poster !== "N/A";
  
  const [isFavorite, setIsFavorite] = useState(() => {
  const favorites = JSON.parse(
    localStorage.getItem("movieFavorites") || "[]"
  );

  return favorites.some(
    (item) => item.imdbID === movie.imdbID
  );
});

const toggleFavorite = () => {
  const favorites = JSON.parse(
    localStorage.getItem("movieFavorites") || "[]"
  );

  if (isFavorite) {
    const updatedFavorites = favorites.filter(
      (item) => item.imdbID !== movie.imdbID
    );

    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(false);
    onFavoriteChange?.();
  } else {
    favorites.push(movie);

    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);
    onFavoriteChange?.();
  }
};

  return (
    <div className="movie-card">
      {hasPoster && !imageError ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Poster Available
        </div>
      )}

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <div className="movie-meta">
          <span className="movie-year">
            {movie.Year}
          </span>

          <span className="movie-type">
            {movie.Type}
          </span>
        </div>

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>

        <Link
          className="details-btn"
          to={`/movies/${movie.imdbID}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;