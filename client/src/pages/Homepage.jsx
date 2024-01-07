import React from 'react'
import Header from '../components/Header'
import Subnavebar from '../components/Subnavebar'
import CategoryFormModal from '../components/CategoryForm'
import SubcategoryForm from '../components/SubCategoryForm'
import Sidebar from '../components/Sidebar'
import ProductForm from '../components/ProductForm'





const Homepage = () => {
  return (
    <>
    <Header/>
    <Subnavebar/>
    <Sidebar/>
    <ProductForm/>
    <CategoryFormModal/>
    <SubcategoryForm/>
    </>
  )
}

export default Homepage
