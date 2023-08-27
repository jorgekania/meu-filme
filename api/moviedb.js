import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiLanguage = "&language=pt-BR";

// Define endpoints using template strings
const createEndpoint = (path) => `${apiBaseUrl}${path}?api_key=${apiKey}${apiLanguage}`;

const endpoints = {
  trendingMovies: createEndpoint("/trending/movie/day"),
  upcomingMovies: createEndpoint("/movie/upcoming"),
  topRatedMovies: createEndpoint("/movie/top_rated"),
  searchMovies: createEndpoint("/search/movie"),
  movieDetails: (id) => createEndpoint(`/movie/${id}`),
  movieCredits: (id) => createEndpoint(`/movie/${id}/credits`),
  similarMovies: (id) => createEndpoint(`/movie/${id}/similar`),
  personDetails: (id) => createEndpoint(`/person/${id}`),
  personMovies: (id) => createEndpoint(`/person/${id}/movie_credits`),
};

const imageBaseUrl = 'https://image.tmdb.org/t/p';
const imageWidths = {
  w500: "w500",
  w342: "w342",
  w185: "w185",
};

// Create image URL function
const createImageUrl = (width, posterPath) =>
  posterPath ? `${imageBaseUrl}/${width}${posterPath}` : null;

export const image500 = (posterPath) => createImageUrl(imageWidths.w500, posterPath);
export const image342 = (posterPath) => createImageUrl(imageWidths.w342, posterPath);
export const image185 = (posterPath) => createImageUrl(imageWidths.w185, posterPath);

const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";

const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params = {}) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return {};
  }
};

// Home screen APIs
export const fetchTrendingMovies = () => apiCall(endpoints.trendingMovies);
export const fetchUpcomingMovies = () => apiCall(endpoints.upcomingMovies);
export const fetchTopRatedMovies = () => apiCall(endpoints.topRatedMovies);

// Movie screen APIs
export const fetchMovieDetails = (id) => apiCall(endpoints.movieDetails(id));
export const fetchMovieCredits = (movieId) => apiCall(endpoints.movieCredits(movieId));
export const fetchSimilarMovies = (movieId) => apiCall(endpoints.similarMovies(movieId));

// Person screen APIs
export const fetchPersonDetails = (personId) => apiCall(endpoints.personDetails(personId));
export const fetchPersonMovies = (personId) => apiCall(endpoints.personMovies(personId));

// Search screen APIs
export const searchMovies = (params) => apiCall(endpoints.searchMovies, params);
