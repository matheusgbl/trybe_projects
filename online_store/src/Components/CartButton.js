import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import '../styles/cartBtn.css';

class CartButton extends Component {
  render() {
    const { quantity } = this.props;

    return (
      <section className="cart-button">
        <div className="cart-icon">
          <Link to="/cart-basket" data-testid="shopping-cart-button">
            <AiOutlineShoppingCart size={ 40 } color="white" />
          </Link>
        </div>
        <p
          data-testid="shopping-cart-size"
          className="cart-quantity"
        >
          { quantity.length }
        </p>
      </section>
    );
  }
}

CartButton.propTypes = {
  quantity: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

CartButton.defaultProps = {
  quantity: 0,
};

export default CartButton;
