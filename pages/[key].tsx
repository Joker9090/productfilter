import Head from 'next/head'
import React from 'react'
import { connect } from "react-redux";
import { Header } from '../components/Header';
import Menu from '../components/Menu';
import Modal from '../components/Modal';
import { ProductFilter } from '../components/ProductFilter';
import { ProductList } from '../components/ProductList';
import { ProductFilterShimer } from '../components/Shimers/ProductFilterShimer';
import { ProductListShimer } from '../components/Shimers/ProductListShimer';
import { getProduct, getProducts, MainReduxActions, filterProducts, removeProduct, setProduct } from '../redux/actions/main';
import { MainReduxState, ServerFetching } from '../redux/reducers/main';
import { useRouter } from 'next/router'
import { Product } from '../models/Product';

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

const Home = ({ productsStatus, productStatus, filterObject, activeProduct, products, getProduct, getProducts, filterProducts }: MainReduxState & MainReduxActions) => {
  const router = useRouter();
  const { key } = router.query;

  React.useEffect(() => {
    if (key) {
      getProduct(key.toString());
    }
  }, [key])

  React.useEffect(() => {
    getProducts();
  }, []);

  const setActiveProduct = (product: Product) => {
    getProduct(product.id);
  }

  const createNew = () => {
    console.log("createNew", createNew)
  }

  return (
    <div>
      <Head>
        <title>Product Filter Challenge</title>
        <meta name="description" content="Product Filter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {productsStatus != ServerFetching.FETCH ? (
        <main className="layout">
          <ProductFilterShimer />
          <ProductListShimer />
        </main>
      ) : (
        <main className="layout">
          <ProductFilter filterObject={filterObject} filterProducts={filterProducts} />
          <ProductList products={products} setActiveProduct={setActiveProduct} />
          <Menu createNew={createNew} />
        </main>
      )}
      {activeProduct && (<Modal onClose={() => console.log("set somethinf")} product={activeProduct} />)}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);