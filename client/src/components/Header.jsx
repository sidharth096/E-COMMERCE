import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { setProducts } from "../redux/slices/productSlice";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {

      const response = await axios.get(`http://localhost:3001/searchproduct/${searchQuery}`);
      dispatch(setProducts(response.data))

     
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  };

  return (
    <header className="bg-sky-800 p-4 text-white h-14">
      <div className="flex justify-between px-10">
        <div>
          <h1 className="text-xl font-semibold cursor-pointer">{user.name} </h1>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search anything"
            className="bg-gray-200 text-black px-5 py-2 rounded-l-xl focus:outline-none focus:ring focus:border-sky-300 text-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-yellow-500 rounded-r-xl text-xs py-2 px-4" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="flex gap-5">
          {user ?(
              <h3 className="text-xs cursor-pointer" >
              Logout
            </h3>
          ):(
          <h3 className="text-xs cursor-pointer" onClick={() => navigate('/signup')}>
           Sign in
        </h3>
          )}
          
          <FontAwesomeIcon className="cursor-pointer" icon={faHeart} />
          <div className="bg-yellow-500 text-white text-xs p-1 rounded-full h-5">
            {wishlist.length}
          </div>
          <FontAwesomeIcon className="cursor-pointer" icon={faShoppingCart} style={{ color: "#ffffff" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
