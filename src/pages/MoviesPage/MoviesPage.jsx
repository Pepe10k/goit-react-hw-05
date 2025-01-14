import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { fetchMoviesByKeyword } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get('query');

  const validationSchema = Yup.object({
    query: Yup.string().min(1, '1 character min').required('Required field'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    if (query.trim()) {
      setSearchParams({ query });
      resetForm();
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await fetchMoviesByKeyword(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className={styles.container}>
      <h1>Search for movies</h1>
      <Formik
        initialValues={{ query: query || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field
              name="query"
              type="text"
              placeholder="Enter the movie title"
              className={styles.input}
            />
            {errors.query && touched.query && (
              <div className={styles.error}>{errors.query}</div>
            )}
            <button type="submit" className={styles.button}>
              Search
            </button>
          </Form>
        )}
      </Formik>
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 ? (
        <MovieList movies={movies} location={location} />
      ) : (
        !loading &&
        !movies.length &&
        query && <p className={styles.noMovies}>No movies found</p>
      )}
    </div>
  );
};

export default MoviesPage;
