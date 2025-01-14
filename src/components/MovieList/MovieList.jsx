import PropTypes from 'prop-types';
import styles from './MovieList.module.css';
import { Link } from 'react-router-dom';

const MovieList = ({ movies, location }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {poster && (
              <img src={poster} alt={title} className={styles.image} />
            )}
            <p className={styles.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string,
    })
  ).isRequired,
  location: PropTypes.object.isRequired,
};

export default MovieList;
