import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { setProducts } from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const Sidebar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:3001/getcategories');
        const subcategoriesResponse = await axios.get('http://localhost:3001/getsubcategories');

        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterProduct = () => {
    try {

      const filteredProducts = products.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );

      dispatch(setProducts(filteredProducts));
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.includes(subcategory._id)) {
        return prevSelected.filter((id) => id !== subcategory._id);
      } else {
        return [...prevSelected, subcategory._id];
      }
    });
  };

  const handleFilterButtonClick = () => {
    filterProduct();
  };

  return (
    <div className="p-10 md:pl-20 200 w-80">
      <h2 className="text-2xl mb-4 text-sky-700 font-semibold">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="mb-2">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleCategoryClick(category._id)}
            >
              <span className="font-semibold">{category.categoryname}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {selectedSubcategories.includes(category._id) && (
              <ul className="pl-4">
                {subcategories
                  .filter((subcategory) => subcategory.categoryId === category._id)
                  .map((subcategory) => (
                    <li key={subcategory._id} className="text-gray-700">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory._id)}
                          onChange={() => handleSubcategoryChange(subcategory)}
                          className="mr-2"
                        />
                        {subcategory.subcategoryname}
                      </label>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleFilterButtonClick}
        className="bg-yellow-500 text-white px-4 py-2 mt-8 rounded-xl "
      >
        Filter Products
      </button>
    </div>
  );
};

export default Sidebar;
