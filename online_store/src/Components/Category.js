import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/category.css';

class Category extends Component {
  render() {
    const { category, categoryAndQuery } = this.props;
    return (
      <aside className="category-content">
        <h4>Categorias:</h4>
        <ul className="category-ul">
          {
            category.map(({ id, name }) => (
              <li key={ id } className="category-li">
                <button
                  type="button"
                  data-testid="category"
                  onClick={ () => categoryAndQuery(id) }
                  className="category-btn"
                >
                  {name}
                  <hr />
                </button>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

Category.propTypes = {
  category: PropTypes.arrayOf(PropTypes.object),
  categoryAndQuery: PropTypes.func,
};

Category.defaultProps = {
  category: [{}],
  categoryAndQuery: () => {},
};

export default Category;
