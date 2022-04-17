import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import MovieCard from '../MovieCart';
import tmdbApi, { movieType, tvType, category as cate } from 'api/tmdbApi';
import './movie-grid.scss';
import Button, { OutlineButton } from 'components/Button';
import Input from 'components/Input';

function MovieGrid(props) {
  const { category } = props;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    (async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};

        switch (category) {
          case cate.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };

        response = await tmdbApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPages(response.total_pages);
    })();
  }, [category, keyword]);

  async function loadMore() {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };

      switch (category) {
        case cate.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;

        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };

      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  }

  return (
    <>
      <div className="mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard key={i} cate={category} item={item} />
        ))}
      </div>
      {page < totalPages && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      )}
    </>
  );
}

MovieGrid.propTypes = {
  category: PropTypes.string,
};

export function MovieSearch(props) {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const navigate = useNavigate();

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${cate[props.category]}/search/${keyword}`);
    } else {
      navigate(`/${cate[props.category]}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener('keyup', enterEvent);

    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small search-btn" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
}

export default MovieGrid;
