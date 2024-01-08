
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
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

  const handleCategoryClick = (categoryId) => {
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        
        return prevSelected.filter((id) => id !== categoryId);
      } else {
    
        return [...prevSelected, categoryId];
      }
    });
  };

  return (
    <div className="p-10 md:pl-20 200 w-80">
      <h2 className="text-2xl mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="mb-2">
            <div
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category._id)}  
            >
              <span className="font-semibold">{category.categoryname}</span>
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
                          onChange={() => {}}
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
    </div>
  );
};

export default Sidebar;
