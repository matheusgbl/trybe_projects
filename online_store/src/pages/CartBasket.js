import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItems from '../Components/CartItems';
import CartButton from '../Components/CartButton';
import '../styles/cartBasket.css';

class CartBasket extends Component {
  render() {
    const {
      cartList,
      removeItem,
      quantity,
      addToCart,
      decreaseFromCart,
    } = this.props;
    if (cartList.length === 0) {
      return (
        <main>
          <Link to="/">Página Inicial</Link>
          <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        </main>
      );
    }

    return (
      <main className="cart-basket">
        <div className="cart-basket-header">
          <header>
            <Link className="home-link" to="/">
              <h2 className="market">Undefined Shop</h2>
            </Link>
            <CartButton
              quantity={ quantity }
            />
          </header>
        </div>
        <Link to="/">Página Inicial</Link>
        <div className="cart-basket-content">
          <CartItems
            addToCart={ addToCart }
            decreaseFromCart={ decreaseFromCart }
            cartList={ cartList }
            removeItem={ removeItem }
          />
          <Link
            className="cart-basket-link"
            to="/checkout"
            data-testid="checkout-products"
          >
            <button
              className="cart-basket-btn"
              type="button"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

CartBasket.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseFromCart: PropTypes.func.isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default CartBasket;
