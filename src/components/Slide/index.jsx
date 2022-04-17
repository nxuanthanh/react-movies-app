import tmdbApi, { movieType, category } from 'api/tmdbApi';
import Button, { OutlineButton } from 'components/Button';
import Modal, { ModalContent } from 'components/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { w500Image } from 'utils';
import './slide.scss';

function Slide(props) {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    (async () => {
      const params = { page: 1 };

      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));

        console.log(response);
      } catch (error) {
        console.log('Failed to fecth movie list', error);
      }
    })();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <SlideItems item={item} className={`${isActive ? 'active' : ''}`} />}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrialModal key={i} item={item} />
      ))}
    </div>
  );
}

Slide.propTypes = {};

function SlideItems({ item, className }) {
  const navigate = useNavigate();

  const background = `https://image.tmdb.org/t/p/original/${
    item.backdrop_path ? item.backdrop_path : item.poster_path
  }`;

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer';
    }

    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content--info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onclick={() => navigate(`movie/${item.id}`)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content--poster">
          <img src={w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
}

function TrialModal({ item }) {
  const iframeRef = useRef();

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
}

export default Slide;
