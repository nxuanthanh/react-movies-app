import { category as cate } from 'api/tmdbApi';
import HeaderPage from 'components/Header/pages/HeaderPage';
import React from 'react';
import { useParams } from 'react-router';
import MovieGrid from 'features/Movies/components/MovieGrid';

function Catalog(props) {
  const { category } = useParams();

  return (
    <>
      <HeaderPage>{category === cate.movie ? 'Movies' : 'TV Series'}</HeaderPage>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
}

Catalog.propTypes = {};

export default Catalog;
