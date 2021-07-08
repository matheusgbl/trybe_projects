import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import '../styles/moviecard.css';

export default class MovieCard extends Component {
  render() {
    const { movie: { id, title, imagePath, storyline, bookmarked } } = this.props;

    return (
      <div data-testid="movie-card">
        <div className="card">
          <div className="bookmark">
            {!bookmarked
              ? (
                <AiOutlineStar
                  size="28"
                  className="bookmark-icon"
                />
              )
              : (
                <AiFillStar
                  size="28"
                  className="bookmark-icon2"
                />
              )}
          </div>
          <img src={ imagePath } alt={ title } />
          <div className="card-info">
            <h2>{title}</h2>
            <div className="card-info-story">
              <p>{storyline}</p>
              <Link to={ `movies/${id}` }>VER DETALHES</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    title: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    bookmarked: PropTypes.bool,
  }).isRequired,
};
