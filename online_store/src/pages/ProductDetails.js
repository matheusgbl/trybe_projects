import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as api from '../services/api';
import CartButton from '../Components/CartButton';
import '../styles/productDetails.css';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };

    this.getProductDetails = this.getProductDetails.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  async getProductDetails() {
    const { match: { params: { categoryId, id } } } = this.props;
    const productObj = await api.getProductsFromCategoryAndQuery(categoryId, '');
    const productDetails = productObj.results
      .find((product) => product.id === id);
    this.setState({ product: productDetails });
  }

  render() {
    const { product, product: { title, thumbnail, price, shipping } } = this.state;
    const freeShipping = shipping ? shipping.free_shipping : undefined;
    const { addToCart, quantity } = this.props;
    return (
      <section className="product-detail">
        <div className="product-detail-header">
          <header>
            <Link className="home-link" to="/">
              <h2 className="market">Undefined Shop</h2>
            </Link>
            <CartButton
              quantity={ quantity }
            />
          </header>
        </div>
        <Link className="back-link" to="/">
          <AiOutlineArrowLeft style={ { marginTop: 10 } } size={ 26 } color="#ff9000" />
        </Link>
        <div className="product-detail-card">
          <h3
            className="product-detail-title"
            data-testid="product-detail-name"
          >
            { title }
          </h3>
          <div>
            <img className="product-detail-img" src={ thumbnail } alt="product" />
            <p className="product-detail-price">
              Preço: R$
              {' '}
              { price }
            </p>
            { freeShipping
            && (
              <p
                className="product-detail-shipping"
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
          </div>
        </div>
        <button
          type="button"
          onClick={ () => addToCart(product) }
          data-testid="product-detail-add-to-cart"
          className="product-detail-btn"
        >
          Adiciona ao Carrinho
        </button>
        <form>
          <textarea
            className="product-detail-textarea"
            data-testid="product-detail-evaluation"
            name="avaliation"
            placeholder="Faça uma avaliação"
            cols="30"
            rows="10"
          />
        </form>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ProductDetails;
