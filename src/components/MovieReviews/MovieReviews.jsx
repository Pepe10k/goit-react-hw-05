import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <ul className={styles.reviewList}>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map(({ id, author, content }) => (
          <li key={id} className={styles.reviewItem}>
            <p>
              <strong>{author}</strong>
            </p>
            <p>{content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieReviews;
