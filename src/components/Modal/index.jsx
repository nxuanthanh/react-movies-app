import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

function Modal(props) {
  const { id, children } = props;

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${active ? 'active' : ''}`}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export function ModalContent({ onClose = null, children }) {
  const contentRef = useRef();

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (onClose) onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content--close" onClick={closeModal}>
        &#x2715;
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
