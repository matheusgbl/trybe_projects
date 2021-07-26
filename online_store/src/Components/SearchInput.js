import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import '../styles/searchInput.css';

class SearchInput extends Component {
  render() {
    const { inputList, categorieAndQuery } = this.props;

    return (
      <form className="search-form">
        <p
          data-testid="home-initial-message"
          className="search-text"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input
          type="text"
          data-testid="query-input"
          onChange={ inputList }
          className="search-input"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ categorieAndQuery }
          className="search-btn"
        >
          <AiOutlineSearch className="search-btn-icon" size={ 20 } />
        </button>
      </form>
    );
  }
}

SearchInput.propTypes = {
  inputList: PropTypes.func.isRequired,
  categorieAndQuery: PropTypes.func.isRequired,
};

export default SearchInput;
