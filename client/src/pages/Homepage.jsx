import React from 'react'
import Header from '../components/Header'
import Subnavebar from '../components/Subnavebar'
import CategoryFormModal from '../components/CategoryForm'
import SubcategoryForm from '../components/SubCategoryForm'
import Sidebar from '../components/Sidebar'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'







const Homepage = () => {
  return (
    <>
    <Header/>
    <Subnavebar/>
    <div className='flex'>
    <Sidebar/>
    <ProductList/>
    </div>
    <ProductForm/>
    <CategoryFormModal/>
    <SubcategoryForm/>
    </>
  )
}

export default Homepage
