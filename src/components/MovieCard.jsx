import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);

  const hasPoster =
    movie.Poster && movie.Poster !== "N/A";

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

        <p className="movie-year">
          {movie.Year}
        </p>

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