import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCast();
  }, [movieId]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <ul className={styles.castList}>
      {cast.length === 0 ? (
        <p>No casts available.</p>
      ) : (
        cast.map(({ id, name, profile, character }) => (
          <li key={id} className={styles.castItem}>
            <img src={profile} alt={name} className={styles.profileImage} />
            <p>
              <strong>{name}</strong>
            </p>
            <p>Character: {character}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieCast;
