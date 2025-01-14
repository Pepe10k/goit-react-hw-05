import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError(`Failed to fetch trending movies: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Movies</h1>
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </main>
  );
};

export default HomePage;
