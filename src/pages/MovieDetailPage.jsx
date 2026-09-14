import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="detail-page">
        <p>Loading movie details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="detail-page">
        <p>{error}</p>
        <Link to="/">← Back to Home</Link>
      </main>
    );
  }

  const hasPoster =
    movie.Poster && movie.Poster !== "N/A";

  return (
    <main className="detail-page">
      <Link className="back-link" to="/">
        ← Back to Home
      </Link>

      <div className="movie-detail">
        <div className="detail-poster">
          {hasPoster && !imageError ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="no-poster">
              No Poster Available
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1>{movie.Title}</h1>

          <p className="detail-meta">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <div className="rating-badge">
            ⭐ IMDb Rating: {movie.imdbRating}
          </div>  

          <div className="plot">
            <h2>Plot</h2>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetailPage;