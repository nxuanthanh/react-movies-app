import logo from 'assets/images/logo-full.png';
import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';

function Header(props) {
  const headerRef = useRef();

  useEffect(() => {
    const headerShrinkHeight = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', headerShrinkHeight);

    return () => window.removeEventListener('scroll', headerShrinkHeight);
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="header__logo">
          <Link to="/">
            <img className="header__logo--img" src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="header__navbar">
          <li className="header__navbar--link">
            <NavLink
              to="/"
              className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            >
              Home
            </NavLink>
          </li>
          <li className="header__navbar--link">
            <NavLink
              to="movie"
              className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            >
              Movies
            </NavLink>
          </li>
          <li className="header__navbar--link">
            <NavLink
              to="tv"
              className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
            >
              TV Series
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
