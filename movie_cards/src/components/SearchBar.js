import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/searchBar.css';

export default class SearchBar extends Component {
  render() {
    const { searchText, onSearchTextChange, bookmarkedOnly,
      onBookmarkedChange } = this.props;

    return (
      <form data-testid="search-bar-form" className="search-form">
        <label
          htmlFor="text"
          data-testid="text-input-label"
        >
          Inclui o texto
          <input
            type="text"
            data-testid="text-input"
            className="search-text-input"
            value={ searchText }
            onChange={ onSearchTextChange }
          />
        </label>
        <label
          htmlFor="checkbox"
          data-testid="checkbox-input-label"
        >
          Mostrar somente favoritos
          <input
            type="checkbox"
            data-testid="checkbox-input"
            checked={ bookmarkedOnly }
            onChange={ onBookmarkedChange }
          />
        </label>
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
};
