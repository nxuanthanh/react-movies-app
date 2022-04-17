import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import tmdbApi from 'api/tmdbApi';
import { w500Image } from 'utils';

function CastList(props) {
  const { id } = props;
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.credits(category, id);
      setCasts(res.cast.slice(0, 5));
    })();
  }, [category, id]);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{ backgroundImage: `url(${w500Image(item.profile_path)})` }}
          ></div>
          <div className="casts__item__name">{item.name}</div>
        </div>
      ))}
    </div>
  );
}

CastList.propTypes = {
  id: PropTypes.number,
};

export default CastList;
