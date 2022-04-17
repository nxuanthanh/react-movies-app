import React from 'react';
import PropTypes from 'prop-types';
import { category } from 'api/tmdbApi';
import { w500Image } from 'utils';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import './movie-card.scss';

function MovieCard({ item = {}, cate = '' }) {
  const link = `/${category[cate]}/${item.id}`;

  const bg = w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button className="btn-play">
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
}

MovieCard.propTypes = {
  item: PropTypes.object,
  cate: PropTypes.string,
};

export default MovieCard;
