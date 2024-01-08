import React, { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/slices/productSlice';
import { useNavigate, Link } from 'react-router-dom';

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getproducts');
        const data = response.data;
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlistClick = (product) => {
    const isInWishlist = wishlist && wishlist.some((p) => p.id === product._id);
    console.log("33333", isInWishlist);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="px-20 py-5 w-full">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 relative cursor-pointer">
                <button
                  className="absolute top-3 right-3 p-2 bg-sky-200 hover:shadow-md rounded-full text-xs py-1"
                  onClick={() => handleWishlistClick(product._id)}
                >
                  <FontAwesomeIcon icon={faHeart} style={{ color: "#141287" }} />
                </button>

                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-44 object-cover mb-4 rounded-md"
                />
                <Link to={`/product/${product._id}`} key={product.id} className="hover:no-underline">
                <h2 className="text-md font-bold mb-2 text-sky-700">{product.title}</h2>
                <p className="text-black text-xs mb-2">$ {product.variants[0].price}</p>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} style={{ color: "#b9b6b6" }} />
                  ))}
                </div>
                </Link>
              </div>
          
          ))}
        </div>
      ) : (
        <div>
          <h1>No products</h1>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
