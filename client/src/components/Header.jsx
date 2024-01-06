import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  const navigate =useNavigate()
  const user = useSelector((state) => state.user.user);
  console.log("user", user);

  return (
    <header className="bg-sky-800 p-4 text-white h-14 ">
      <div className="flex justify-between px-10">
        <div>
          <h1 className="text-xl font-semibold cursor-pointer ">{user.name} </h1>
        </div>
        <div className="flex gap-5">
          <h3 className="text-xs cursor-pointer" onClick={()=>navigate('/signup')}>Sign in</h3>
          <FontAwesomeIcon className="cursor-pointer" icon= {faHeart}/>
          <FontAwesomeIcon className="cursor-pointer"  icon={faShoppingCart} style={{ color: "#ffffff" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
