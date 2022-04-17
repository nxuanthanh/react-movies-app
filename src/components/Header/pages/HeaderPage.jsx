import bg from 'assets/images/footer-bg.jpg';
import React from 'react';
import './header-page.scss';

function HeaderPage(props) {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
}

HeaderPage.propTypes = {};

export default HeaderPage;
