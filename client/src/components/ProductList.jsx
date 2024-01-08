import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/slices/productSlice';
import { useNavigate, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist);

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6; // Number of products to show per page
  const pagesVisited = pageNumber * productsPerPage;

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

  const handleWishlistClick = (productId) => {
    const isInWishlist = wishlist && wishlist.some((p) => p.id === productId);
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="px-20 py-5 w-full">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(pagesVisited, pagesVisited + productsPerPage).map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg border-2 border-gray-200 relative cursor-pointer">
              <button
                className="absolute top-3 right-3 p-2 bg-sky-200 hover:shadow-md rounded-full text-xs py-1"
                onClick={() => handleWishlistClick(product._id)}
              >
                <FontAwesomeIcon icon={wishlist.some((p) => p.id === product._id) ? faHeart : farHeart} style={{ color: "#141287" }} />
              </button>

              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-44 object-cover mb-4 rounded-md"
              />
              <Link to={`/product/${product._id}`} className="hover:no-underline">
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
     <div className='h-32 flex items-center justify-center'>
     {products.length > productsPerPage && (
          <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'flex space-x-2'}
          previousLinkClassName={'px-3 py-2 text-white rounded-md'}
          nextLinkClassName={'px-3 py-2  text-white rounded-md'}
          disabledClassName={'cursor-not-allowed text-gray-400'}
          activeClassName={'bg-yellow-500 text-white text-xs rounded-full'}
          breakClassName={'mx-2'}
          pageClassName={'px-3  py-2 bg-white text-black text-xs rounded-full'}
          pageLinkClassName={'hover:text-white'}
        />
      )}
     </div>
     
    </div>
  );
};

export default ProductListing;
