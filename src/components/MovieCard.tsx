import React, { useState } from "react";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const poster =
    movie.Poster === "N/A" ? "/api/placeholder/300/450" : movie.Poster;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <img
          src={poster}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white text-lg font-medium">View Details</span>
        </div>
      </a>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
        <p className="text-gray-700">{movie.Year}</p>
        <p className="text-sm text-gray-500 mt-1">{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
