export const TMDB_config = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  header: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMDB_config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_config.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_config.header,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_config.BASE_URL}/movie/${movieId}?api_key=${TMDB_config.API_KEY}`,
      { method: "GET", headers: TMDB_config.header }
    );
    if (!response.ok) throw console.error("failed to fetch movie details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
