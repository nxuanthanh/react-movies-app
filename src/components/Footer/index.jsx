import React from 'react';
import PropTypes from 'prop-types';
import bg from 'assets/images/footer-bg.jpg';
import logo from 'assets/images/logo-full.png';
import { Link } from 'react-router-dom';
import './footer.scss';

function Footer(props) {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content">
        <div className="footer__content__logo">
          <div className="footer__content__logo__box">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className="footer__content__menu__list">
          <div className="footer__content__menu__item">
            <Link to="/">Home</Link>
            <Link to="/">Conatct us</Link>
            <Link to="/">Term of Services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="footer__content__menu__item">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="footer__content__menu__item">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent Release</Link>
            <Link to="/">Top IMDB</Link>
            <Link to="/">About us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
