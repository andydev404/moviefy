import React from 'react';

export default ({ searchMovies }) => {
  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Movie name"
        className="search-form__input"
        onChange={searchMovies}
      />
      <span className="search-form__btn">
        <i className="fas fa-search" />
      </span>
    </div>
  );
};
