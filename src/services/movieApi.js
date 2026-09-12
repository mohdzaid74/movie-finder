const BASE_URL = "https://www.omdbapi.com/";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

  console.log("Requesting OMDb:", url.replace(API_KEY, "HIDDEN"));

  const response = await fetch(url);
  const data = await response.json();

  console.log("OMDb Response:", data);

  if (data.Response === "False") {
    throw new Error(data.Error || "Movies not found");
  }

  return {
    results: data.Search || [],
  };
}
export async function getMovieDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found");
  }

  return data;
}