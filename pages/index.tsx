import Head from 'next/head'
import React from 'react'
import { connect } from "react-redux";
import { Header } from '../components/Header';
import { ProductFilter } from '../components/ProductFilter';
import { ProductList } from '../components/ProductList';
import { ProductFilterShimer } from '../components/Shimers/ProductFilterShimer';
import { ProductListShimer } from '../components/Shimers/ProductListShimer';
import { getProduct, getProducts, MainReduxActions, filterProducts, removeProduct, setProduct } from '../redux/actions/main';
import { MainReduxState, ServerFetching } from '../redux/reducers/main';

const mapStateToProps = (state: { main: MainReduxState }) => {
  const main: MainReduxState = state.main;
  return {
    activeProduct: main.activeProduct,
    products: main.productsFiltered,
    filterObject: main.filterObject,
    productStatus: main.productStatus,
    productsStatus: main.productsStatus,
  }
}

const mapDispatchToProps = {
  getProducts,
  getProduct,
  filterProducts,
  setProduct,
  removeProduct,
}

const Home = ({ productsStatus, productStatus, filterObject, activeProduct, products, getProducts, filterProducts }: MainReduxState & MainReduxActions) => {
  const [_activeProduct, setActiveProduct] = React.useState(activeProduct);

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    if (_activeProduct) getProduct(_activeProduct.id);
  }, [_activeProduct]);

  return (
    <div>
      <Head>
        <title>Product Filter Challenge</title>
        <meta name="description" content="Product Filter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {productsStatus == ServerFetching.FETCHING ? (
        <main className="layout">
          <ProductFilterShimer />
          <ProductListShimer />
        </main>
      ) : (
        <main className="layout">
          <ProductFilter filterObject={filterObject} filterProducts={filterProducts} />
          <ProductList products={products} setActiveProduct={setActiveProduct} />
        </main>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);