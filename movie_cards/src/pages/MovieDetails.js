import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

import '../styles/moviedetails.css';

export default class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  async getMovieDetails() {
    try {
      const { match: { params: { id } } } = this.props;
      const movie = await movieAPI.getMovie(id);
      this.setState({
        movie,
        loading: false,
        id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  deleteMovie(id) {
    movieAPI.deleteMovie(id);
  }

  render() {
    const { movie, loading, id } = this.state;
    if (loading) return <Loading />;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;

    return (
      <div data-testid="movie-details" className="details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <div className="text-details">
          <p>{ `Title: ${title}` }</p>
          <p>{ `Subtitle: ${subtitle}` }</p>
          <p>{ `Storyline: ${storyline}` }</p>
          <p>{ `Genre: ${genre}` }</p>
          <p>{ `Rating: ${rating}` }</p>
          <Link to="/">VOLTAR</Link>
          <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
          <Link to="/" onClick={ () => this.deleteMovie(id) }>DELETAR</Link>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
