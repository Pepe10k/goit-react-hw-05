import {
  useParams,
  useNavigate,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchMovieDetails,
  PLACEHOLDER_IMAGE_POSTER,
} from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchMovieDetails(movieId);
        setMovie(result);
        setError(null);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.detailsContainer}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={movie.poster || PLACEHOLDER_IMAGE_POSTER}
            alt={movie.title}
            className={styles.poster}
          />
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <div className={styles.additionalInfo}>
            <h2>Additional Information</h2>
            <ul>
              <li>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  state={{ from: location.state?.from }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  state={{ from: location.state?.from }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet context={{ movie }} />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
