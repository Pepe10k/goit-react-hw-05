import axios from 'axios';

export const PLACEHOLDER_IMAGE_POSTER =
  'https://placehold.co/300x450?text=No+Poster&font=roboto';
export const PLACEHOLDER_IMAGE_PROFILE =
  'https://placehold.co/200x300?text=No+Photo&font=roboto';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2RjNjc3MWM5NTk3NDc0OGFkNDU5NjljNTlhYzU4ZCIsIm5iZiI6MTczNjg1Mjg4OS4wMjksInN1YiI6IjY3ODY0NTk5YjkwOTRjN2RmZWJiNjljZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drXKnEkcftOkH_BBHRE9xwLhgh7m0eaay4m21buFDkk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get('/trending/movie/day');
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE_POSTER,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const fetchMoviesByKeyword = async query => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: { query },
    });
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title || movie.name,
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE_POSTER,
    }));
  } catch (error) {
    console.error('Error fetching movies by keyword:', error);
    throw error;
  }
};

export const fetchMovieDetails = async movieId => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    const movie = response.data;
    return {
      id: movie.id,
      title: movie.title || movie.name,
      overview: movie.overview,
      genres: movie.genres.map(genre => genre.name),
      poster: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : PLACEHOLDER_IMAGE_POSTER,
      releaseDate: movie.release_date,
      rating: movie.vote_average ? movie.vote_average.toFixed(2) : 'No rating',
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieCast = async movieId => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data.cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile: actor.profile_path
        ? `${IMAGE_BASE_URL}${actor.profile_path}`
        : PLACEHOLDER_IMAGE_PROFILE,
    }));
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

export const fetchMovieReviews = async movieId => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/reviews`);
    return response.data.results.map(review => ({
      id: review.id,
      author: review.author,
      content: review.content,
    }));
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};
