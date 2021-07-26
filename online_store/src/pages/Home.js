import React from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from '@agney/react-loading';
import * as api from '../services/api';
import Products from './Products';
import CartButton from '../Components/CartButton';
import Category from '../Components/Category';
import SearchInput from '../Components/SearchInput';
import '../styles/home.css';
import HomeProducts from '../Components/HomeProducts';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      productList: [],
      categories: [],
      homeProducts: [],
      loading: false,
    };
    this.inputList = this.inputList.bind(this);
    this.categorieAndQuery = this.categorieAndQuery.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getHomeProducts = this.getHomeProducts.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.getHomeProducts();
  }

  async getCategory() {
    const category = await api.getCategories();
    this.setState({ categories: category });
  }

  async getHomeProducts(id = 'MLB1648') {
    this.setState({ loading: true });
    const data = await
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&limit=8`)
      .then((response) => response.json())
      .then((response) => this.setState({ homeProducts: response.results }));

    this.setState({ loading: false });
    return data;
  }

  inputList({ target }) {
    this.setState({
      search: target.value,
    });
  }

  async categorieAndQuery(id = '') {
    this.setState({
      loading: true,
      homeProducts: [],
      productList: [],
    });
    const { search } = this.state;

    const { results } = await api.getProductsFromCategoryAndQuery(id, search);
    this.setState({
      productList: results,
      loading: false,
    });
  }

  render() {
    const { addToCart, quantity } = this.props;
    const { productList, categories, homeProducts, loading } = this.state;
    console.log(loading);

    return (
      <section>
        <header>
          <div className="header-content">
            <h2 className="market">Undefined Shop</h2>
            <SearchInput
              inputList={ this.inputList }
              categorieAndQuery={ this.categorieAndQuery }
            />
            <CartButton
              quantity={ quantity }
            />
          </div>
        </header>
        <Category
          category={ categories }
          categoryAndQuery={ this.categorieAndQuery }
        />
        {loading ? <ThreeDots className="loading" width="50" /> : null}
        {productList.length > 1
          ? (
            <Products
              productList={ productList }
              addToCart={ addToCart }
              quantity={ quantity }
            />
          )

          : (
            <HomeProducts
              addToCart={ addToCart }
              quantity={ quantity }
              homeProducts={ homeProducts }
            />
          )}
      </section>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Home.defaultProps = {
  quantity: 0,
};

export default Home;
