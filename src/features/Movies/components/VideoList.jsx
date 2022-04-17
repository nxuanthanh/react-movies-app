import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import tmdbApi from 'api/tmdbApi';

function VideoList({ id }) {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.getVideos(category, id);
      setVideos(res.results.slice(0, 5));
    })();
  }, [category, id]);
  return (
    <>
      {videos.map((video, i) => (
        <Video key={i} item={video} />
      ))}
    </>
  );
}

VideoList.propTypes = {
  id: PropTypes.number,
};

function Video({ item }) {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
}

export default VideoList;
