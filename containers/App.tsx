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
import { getProduct, getProducts, cleanProduct, MainReduxActions, filterProducts, removeLocalProduct, saveLocalProduct, createProduct } from '../redux/actions/main';
import { MainReduxState, ServerFetching } from '../redux/reducers/main';
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
  cleanProduct,
  filterProducts,
  removeLocalProduct,
  saveLocalProduct,
  createProduct,
}
export enum LayoutOptions { NORMAL, LEFT, MIDDLE }

const App = ({ productKey, productsStatus, productStatus, filterObject, activeProduct, products, getProduct, getProducts, filterProducts, cleanProduct, saveLocalProduct, removeLocalProduct, createProduct }: MainReduxState & MainReduxActions & { productKey: string | null }) => {

  const [layout, setLayout] = React.useState(LayoutOptions.NORMAL);

  React.useEffect(() => {
    if (productKey) {
      getProduct(productKey.toString());
    }
  }, [productKey])

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    // TODO LOADING MODAL
  }, [productStatus])

  const setActiveProduct = (product: Product) => {
    getProduct(product.id);
  }

  const createNew = () => {
    createProduct();
  }

  const closeModal = () => {
    cleanProduct();
  }
  const onRemove = (product: Product) => {
    removeLocalProduct(product);
    cleanProduct();
  }

  const onSave = (product: Product) => {
    saveLocalProduct(product);
    cleanProduct();
  }
  const changeLayout = () => {
    let newLayout = layout;
    if (layout == LayoutOptions.NORMAL) newLayout = LayoutOptions.LEFT;
    else if (layout == LayoutOptions.LEFT) newLayout = LayoutOptions.MIDDLE;
    else if (layout == LayoutOptions.MIDDLE) newLayout = LayoutOptions.NORMAL;
    setLayout(newLayout);
  }

  return (
    <div className="Background">
      <Head>
        <title>Product Filter Challenge</title>
        <meta name="description" content="Product Filter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {productStatus == ServerFetching.FETCHING ? (
        <div className="productLoading" />
      ) : (<></>)}
      {productsStatus != ServerFetching.FETCH ? (
        <main className={`layout ${LayoutOptions[layout]}`}>
          <Header changeLayout={changeLayout} />
          <ProductFilterShimer />
          <ProductListShimer />
        </main>
      ) : (
        <main className={`layout ${LayoutOptions[layout]}`}>
          <Header changeLayout={changeLayout} />
          <ProductFilter filterObject={filterObject} filterProducts={filterProducts} />
          <ProductList products={products} setActiveProduct={setActiveProduct} />
          <Menu createNew={createNew} />
        </main>
      )}
      {activeProduct && (<Modal removeProduct={onRemove} saveProduct={onSave} onClose={closeModal} product={activeProduct} />)}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);