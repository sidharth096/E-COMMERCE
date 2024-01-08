import React from 'react'
import Header from '../components/Header'
import ProductDetails from '../components/ProductDetails'
import { useParams } from 'react-router-dom';
import EditProduct from '../components/EditProduct';


const ProductDetalsPage = () => {
    const  {id} = useParams();
  return (
    <>
    <Header/>
    <ProductDetails id={id}/>
    <EditProduct/>
    </>
  )
}

export default ProductDetalsPage
