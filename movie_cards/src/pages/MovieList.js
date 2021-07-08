import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';

import { Loading, MovieCard } from '../components';
import SearchBar from '../components/SearchBar';

import '../styles/movielist.css';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      movies: [],
      loading: true,
    };
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.filteredMovies = this.filteredMovies.bind(this);
    this.getMoviesList = this.getMoviesList.bind(this);
  }

  componentDidMount() {
    this.filteredMovies();
    this.getMoviesList();
  }

  onSearchTextChange({ target }) {
    this.setState({
      searchText: target.value,
    });
  }

  onBookmarkedChange() {
    const { bookmarkedOnly } = this.state;
    if (bookmarkedOnly === false) {
      this.setState({
        bookmarkedOnly: true,
      });
    } else {
      this.setState({
        bookmarkedOnly: false,
      });
    }
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

  filteredMovies() {
    const { movies, searchText, bookmarkedOnly } = this.state;
    let moviesList = movies.filter(({ title, subtitle, storyline }) => (
      title.includes(searchText)
          || subtitle.includes(searchText)
          || storyline.includes(searchText)

          || title.toLowerCase().includes(searchText)
          || subtitle.toLowerCase().includes(searchText)
          || storyline.toLowerCase().includes(searchText)
    ));
    if (bookmarkedOnly) {
      moviesList = moviesList.filter(({ bookmarked }) => bookmarked);
    }
    return moviesList;
  }

  render() {
    const {
      onSearchTextChange,
      onBookmarkedChange,
      filteredMovies,
    } = this;
    const { loading, searchText, bookmarkedOnly } = this.state;

    if (loading) return <Loading />;

    const movies = filteredMovies();

    return (
      <div data-testid="movie-list">
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ onSearchTextChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ onBookmarkedChange }
        />
        <div className="movies">
          {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </div>
        <Link to="/movies/new" className="new-card">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}
