import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdAdd, MdRemove } from 'react-icons/md';
import '../styles/cartManipulation.css';

class CartManipulation extends React.Component {
  render() {
    const {
      item,
      removeItem,
      item: { price },
      productQuantity,
      addToCart,
      decreaseFromCart,
    } = this.props;

    return (
      <section className="cart-manipulation">
        <div key={ item.id } className="cart-manipulation-content">
          <img
            src={ item.thumbnail }
            alt="Foto do produto"
            className="cart-manipulation-img"
          />
          <h1
            data-testid="shopping-cart-product-name"
            className="cart-manipulation-title"
          >
            Produto:
            {' '}
            { item.title }
          </h1>
          <div className="cart-manipulation-div02">
            <p
              data-testid="shopping-cart-product-quantity"
              className="cart-manipulation-quantity"
            >
              { productQuantity }
            </p>
            <button
              type="button"
              onClick={ () => removeItem(item) }
              className="cart-manipulation-remove-btn"
            >
              <MdDelete size={ 20 } />
            </button>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => addToCart(item) }
              className="cart-manipulation-add-btn"
            >
              <MdAdd size={ 20 } />
            </button>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              className="cart-manipulation-decrease-btn"
              onClick={ () => decreaseFromCart(item) }
            >
              <MdRemove size={ 20 } />
            </button>
            <p className="cart-manipulation-price">
              Preço total:
              {' '}
              {
                (`R$ ${productQuantity * price}`)
              }
            </p>
          </div>
        </div>
      </section>
    );
  }
}

CartManipulation.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    available_quantity: PropTypes.number,
  }).isRequired,
  productQuantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseFromCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartManipulation;
