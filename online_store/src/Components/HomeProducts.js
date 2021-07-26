import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cardproduct from './CardProduct';
import '../styles/homeProduct.css';

class HomeProducts extends Component {
  render() {
    const { homeProducts, addToCart } = this.props;
    return (
      <div className="product-home-content">
        { homeProducts.map((product) => (
          <div key={ product.id }>
            <Cardproduct
              shipping={ product.shipping }
              title={ product.title }
              img={ product.thumbnail }
              price={ product.price }
              id={ product.id }
              categoryId={ product.category_id }
              addToCart={ () => addToCart(product) }
            />
          </div>
        ))}
      </div>
    );
  }
}

HomeProducts.propTypes = {
  homeProducts: PropTypes.arrayOf(
    PropTypes.object,
  ),
  addToCart: PropTypes.func,
};

HomeProducts.defaultProps = {
  homeProducts: [],
  addToCart: () => {},
};

export default HomeProducts;
