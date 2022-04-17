import tmdbApi, { category as cate } from 'api/tmdbApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../MovieCart';
import './movie-list.scss';

function MovieList(props) {
  const { id, type, category } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      let response = null;
      const params = {};

      if (type !== 'similar') {
        switch (category) {
          case cate.movie:
            response = await tmdbApi.getMoviesList(type, { params });
            break;

          default:
            response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }

      setItems(response.results);
    })();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView="auto">
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} cate={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

MovieList.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
};

export default MovieList;
