import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLocalShipping } from 'react-icons/md';
import '../styles/productCard.css';

class Cardproduct extends Component {
  render() {
    const {
      product,
      title,
      img,
      price,
      id,
      categoryId,
      addToCart,
      shipping,
    } = this.props;
    return (
      <div data-testid="product" className="card-product">
        <div className="card-product-content">
          <img src={ img } alt="produto" className="card-product-img" />
          <p className="card-product-title">{ title }</p>
          <p className="card-product-price">
            R$
            {' '}
            { price }
          </p>
          { shipping.free_shipping
            && (
              <p
                className="card-product-shipping"
                data-testid="free-shipping"
              >
                <MdLocalShipping
                  style={ { marginBottom: -2, marginRight: 5 } }
                  size={ 14 }
                  color="#ff9000"
                />
                Frete Grátis
              </p>
            )}
          <Link
            to={ `/product-details/${categoryId}/${id}` }
            data-testid="product-detail-link"
            className="card-product-details"
          >
            Ver Detalhes
          </Link>
        </div>
        <button
          type="button"
          onClick={ () => addToCart(product) }
          data-testid="product-add-to-cart"
          className="product-card-btn"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Cardproduct.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.object,
  ),
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool,
  }).isRequired,
};

Cardproduct.defaultProps = {
  product: [{}],
};

export default Cardproduct;
