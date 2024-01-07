import React from 'react'
import {useDispatch} from 'react-redux'
import { openModalCategory,openModalSubCategory,openModalProduct} from '../redux/slices/modalSlice'

const Subnavebar = () => {

    const dispatch = useDispatch()

  return (
    <>
    <div className='flex justify-between p-10'>
        <div>
            <h3>Home</h3>
        </div>
        <div className='text-white text-sm'>
            <button className='bg-yellow-500 rounded-2xl p-3 ' onClick={()=>dispatch(openModalCategory())}>
                Add category
            </button>
            <button className='bg-yellow-500 rounded-2xl p-3 ml-5' onClick={()=>dispatch(openModalSubCategory())}>
                Add sub cateory
            </button>
            <button className='bg-yellow-500 rounded-2xl p-3 ml-5' onClick={()=>dispatch(openModalProduct())}>
                Add product
            </button>
        </div>
    </div>
    </>
  )
}

export default Subnavebar
