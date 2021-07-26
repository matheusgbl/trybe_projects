import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CartBasket from './pages/CartBasket';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartList: [],
      quantity: [],
    };
    this.removeItem = this.removeItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.decreaseFromCart = this.decreaseFromCart.bind(this);
    this.loadCartQuantity = this.loadCartQuantity.bind(this);
    this.loadCartProducts = this.loadCartProducts.bind(this);
    this.localStorageProducts = this.localStorageProducts.bind(this);
    this.saveOnLocalStorage = this.saveOnLocalStorage.bind(this);
  }

  componentDidMount() {
    this.loadCartQuantity();
    this.loadCartProducts();
  }

  addToCart(item) {
    const { cartList } = this.state;
    const cartItems = cartList.filter((cart) => cart.id === item.id);
    const availableQuantity = item.available_quantity;
    if (cartItems.length >= availableQuantity) return;
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, item],
      quantity: [...prevState.quantity, item],
    }), () => {
      this.saveOnLocalStorage();
    });
  }

  saveOnLocalStorage() {
    const { cartList, quantity } = this.state;
    localStorage.setItem('quantity', JSON.stringify(quantity));
    localStorage.setItem('cartProducts', JSON.stringify(cartList));
  }

  decreaseFromCart(item) {
    const { cartList } = this.state;
    const index = cartList.indexOf(item.id);
    cartList.splice(index, 1).sort();
    this.setState((prevState) => ({
      ...prevState.cartList,
      quantity: prevState.cartList,
    }), () => {
      this.saveOnLocalStorage();
    });
  }

  loadCartQuantity() {
    if (!localStorage.quantity) {
      return;
    }
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    this.setState({ quantity });
  }

  loadCartProducts() {
    if (!localStorage.cartProducts) {
      return;
    }

    const cartList = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({ cartList });
  }

  localStorageProducts(item) {
    const { id } = item;
    const { cartList, quantity } = this.state;
    const productQuantity = (productId) => (
      Object.keys(cartList)
        .filter((item1) => cartList[item1].id === productId)
    );
    const quantityObj = Object.keys(cartList).map((p) => (
      productQuantity(cartList[p].id)
    ));
    const cartProducts = cartList.findIndex((cart) => cart.id === id);
    const length = -1;

    if (cartProducts !== length) {
      cartList.splice(cartProducts, quantityObj[0].length);
      localStorage.setItem('cartProducts', JSON.stringify(cartList));
    }
    const cartQuantity = quantity.findIndex((quant) => quant.id === id);

    if (cartQuantity !== length) {
      quantity.splice(cartQuantity, quantityObj[0].length);
      localStorage.setItem('quantity', JSON.stringify(quantity));
    }
  }

  removeItem(item) {
    const { id } = item;
    this.setState((prev) => {
      const { cartList } = prev;
      const filtro = cartList.filter((cartItem) => cartItem.id !== id);
      return { cartList: filtro };
    });
    this.localStorageProducts(item);
  }

  render() {
    const { cartList, quantity } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart-basket"
            render={ (props) => (<CartBasket
              { ...props }
              cartList={ cartList }
              quantity={ quantity }
              removeItem={ this.removeItem }
              addToCart={ this.addToCart }
              decreaseFromCart={ this.decreaseFromCart }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              addToCart={ this.addToCart }
              quantity={ quantity }
            />) }
          />
          <Route
            exact
            path="/product-details/:categoryId/:id"
            render={
              (props) => (<ProductDetails
                { ...props }
                addToCart={ this.addToCart }
                quantity={ quantity }
              />)
            }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
                cartList={ cartList }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
