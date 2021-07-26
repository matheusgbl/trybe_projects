import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartManipulation from './CartManipulation';
import '../styles/cartItems.css';

class CartItems extends Component {
  render() {
    const { cartList, removeItem, addToCart, decreaseFromCart } = this.props;

    const productQuantity = (productId) => (
      Object.keys(cartList)
        .filter((item) => cartList[item].id === productId).length
    );

    const preventDuplicateProducts = cartList
      .filter((v, i, a) => a.findIndex((t) => (t.id === v.id)) === i);

    return (
      <div>
        <h2 className="cart-items-text">
          Carrinho De Compras
        </h2>
        <div className="cart-items-content">
          {Object.keys(preventDuplicateProducts).map((item) => (
            <div key={ preventDuplicateProducts[item].id } className="cart-items-card">
              <CartManipulation
                item={ preventDuplicateProducts[item] }
                removeItem={ removeItem }
                productQuantity={
                  productQuantity(preventDuplicateProducts[item].id)
                }
                addToCart={ () => addToCart(preventDuplicateProducts[item]) }
                decreaseFromCart={
                  () => decreaseFromCart(preventDuplicateProducts[item])
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CartItems.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseFromCart: PropTypes.func.isRequired,
};

export default CartItems;
