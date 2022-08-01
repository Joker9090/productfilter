import Head from 'next/head'
import React from 'react'
import { connect } from "react-redux";
import { Header } from '../components/Header';
import { ProductList } from '../components/ProductList';
import { getProduct, getProducts, MainReduxActions, removeProduct, setProduct } from '../redux/actions/main';
import { MainReduxState } from '../redux/reducers/main';

const mapStateToProps = (state: { main: MainReduxState }) => {
  const main: MainReduxState = state.main;
  return {
    activeProduct: main.activeProduct,
    products: main.products
  }
}

const mapDispatchToProps = {
  getProducts,
  getProduct,
  setProduct,
  removeProduct,
}

const Home = ({ activeProduct, products, getProducts }: MainReduxState & MainReduxActions) => {
  
  return (
    <div>
      <Head>
        <title>Product Filter Challenge</title>
        <meta name="description" content="Product Filter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);