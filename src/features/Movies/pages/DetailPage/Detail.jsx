import tmdbApi from 'api/tmdbApi';
import MovieList from 'features/Movies/components/MovieList';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { originalImage } from 'utils';
import CastList from '../../components/CastList';
import VideoList from '../../components/VideoList';
import './detail-page.scss';

function Detail(props) {
  const { category, id } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    (async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    })();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${originalImage(item.backdrop_path || item.poster_path)})`,
            }}
          ></div>
          <div className="mb-3 movie__content">
            <div className="movie__content__poster">
              <div
                className="movie__content__poster__img"
                style={{
                  backgroundImage: `url(${originalImage(item.poster_path || item.backdrop_path)})`,
                }}
              ></div>
            </div>
            <div className="movie__content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} id={item.id} type="similar" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

Detail.propTypes = {};

export default Detail;
