import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/moviecard.css';

export default class MovieCard extends Component {
  render() {
    const { movie: { id, title, imagePath, storyline } } = this.props;

    return (
      <div data-testid="movie-card">
        <div className="card">
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
  }).isRequired,
};
