import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { Movie } from "./types";
import { searchMovies } from "./services/api";
import Loading from "./components/Loading";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
      setHasSearched(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Movie Search
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {hasSearched && !loading && !error && movies.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No movies found. Try a different search term.
          </div>
        )}

        {loading && <Loading />}
      </div>
    </div>
  );
};

export default App;
