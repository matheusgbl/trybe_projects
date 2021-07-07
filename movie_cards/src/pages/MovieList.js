import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';

import { Loading, MovieCard } from '../components';

import '../styles/movielist.css';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
    this.getMoviesList = this.getMoviesList.bind(this);
  }

  componentDidMount() {
    this.getMoviesList();
  }

  async getMoviesList() {
    try {
      const movies = await movieAPI.getMovies();
      this.setState({
        movies,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="movie-list">
        <Link to="/movies/new" className="new-card">ADICIONAR CARTÃO</Link>
        <div className="movies">
          {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </div>
      </div>
    );
  }
}
