// src/services/api.ts

import { Movie, SearchResponse } from "../types";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "9af4e969";
const BASE_URL = "https://www.omdbapi.com";

/**
 * Search for movies by title
 * @param query Search term
 * @returns Promise with movie search results
 */
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from OMDB API");
    }

    const data: SearchResponse = await response.json();

    if (data.Response === "True" && data.Search) {
      return data.Search.slice(0, 3); // Return only top 3 results
    } else {
      throw new Error(data.Error || "No results found");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

/**
 * Get detailed information about a specific movie
 * @param id IMDB ID of the movie
 * @returns Promise with detailed movie information
 */
export const getMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(`${BASE_URL}/?i=${id}&apikey=${API_KEY}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();

    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error || "Movie not found");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
