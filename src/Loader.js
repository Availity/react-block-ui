import React from 'react';

function Loader() {
  return (
    <div className="loading-indicator">
      <span className="loading-bullet">&bull;</span>{' '}
      <span className="loading-bullet">&bull;</span>{' '}
      <span className="loading-bullet">&bull;</span>
    </div>
  );
}

export default Loader;
