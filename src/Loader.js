import React from 'react';
import PropTypes from 'prop-types';
function Loader({ ariaLabel }) {
  return (
    <div className="loading-indicator">
      <span className="sr-only">{ariaLabel}</span>
      <span aria-hidden className="loading-bullet">&bull;</span>{' '}
      <span aria-hidden className="loading-bullet">&bull;</span>{' '}
      <span aria-hidden className="loading-bullet">&bull;</span>
    </div>
  );
}

Loader.propTypes = {
  ariaLabel: PropTypes.string,
};

export default Loader;
