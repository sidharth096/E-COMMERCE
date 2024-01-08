import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { openModalEditProduct } from '../redux/slices/modalSlice';
import { setSingleProduct } from '../redux/slices/singleProductSlice';
import { addToWishlist,removeFromWishlist } from '../redux/slices/wishlistSlice';

const ProductDetails = (productId ) => {
 console.log("aaa");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const product = useSelector((state)=>state.singleproduct.singleproduct)
  const wishlist = useSelector((state) => state.wishlist);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getproductbyId/${productId.id}`);
        
        dispatch(setSingleProduct(response.data))

      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleWishlistClick = (productId) => {
    console.log(productId);
    const isInWishlist = wishlist && wishlist.some((p) => p.id === productId);
    console.log("33333", isInWishlist);
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };


  return (
    <>
      <div className="p-10 ml-10">
        <h3>
          <span className='cursor-pointer' onClick={()=>navigate('/')}>
               Home
          </span> / Product details</h3>
      </div>
      <div className="">
        {product&& product ? (
          <div className="flex justify-center gap-20">

            <div className="flex flex-col">
              <img src={product.images[0]} alt="Product" className="w-full h-96 rounded-lg mb-4 border-2 border-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <img src={product.images[1]} alt="Product" className="w-full h-32 rounded-lg mb-4 border-2 border-gray-200 object-contain" />
                <img src={product.images[2]} alt="Product" className="w-full h-32 rounded-lg mb-4 border-2 border-gray-200 object-contain" />
              </div>
            </div>


            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-bold text-sky-700 mb-4">${product.variants[0].price}</p>
              {product.variants[0].quantity > 0 ? (
                <>
                  <p className='text-sm md:text-lg'>Availability: <span className="text-green-500">In stock</span></p>
                  <p className='text-gray-500 text-sm md:text-md'>Hurry up! Only {product.variants[0].quantity} product left in stock!</p>
                </>
              ) : (
                <p>Availability: <span className="text-red-500">Out of stock</span></p>
              )}

                <div className="border-b-2 border-gray-200 my-10 w-full "></div>

                <p className=''>Ram: {product.variants.map((variant) => variant.ram).join(', ')}</p>
                <p className='mt-2'>Quantity:</p>
                
                <div className='mt-8 flex items-center'>
                  <button className='bg-yellow-500 rounded-3xl text-white py-3 px-6 mr-4' onClick={()=>dispatch(openModalEditProduct())}>
                    Edit product
                  </button>
                  <button className='bg-yellow-500 rounded-3xl text-white py-3 px-6'>
                    Buy it now
                  </button>
                  <div className='bg-gray-200 rounded-full px-3 py-2 ml-10 cursor-pointer' onClick={() => handleWishlistClick(product._id)}>
                    <FontAwesomeIcon className='' icon={faHeart} style={{ color: "#141287" }} />
                  </div>
                  
                </div> 
       
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        )}
      </div>
     
    </>
  );
};

export default ProductDetails;
