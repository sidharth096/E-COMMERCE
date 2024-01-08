
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalSubCategory } from '../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubcategoryForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isModalSubCategoryOpen);
  const [categories, setCategories] = useState([]);
  const [subcategoryname, setSubcategoryName] = useState('');
  const [categoryId, setcategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3001/addsubcategory', {
        subcategoryname,
        categoryId,
      });

      console.log('Server response:', response.data);
      toast.success(response.data.message);
      dispatch(closeModalSubCategory());
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      width: '300px',
      height: '220px',
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      border: 'none',
      borderRadius: '8px',
    },
  };

  return (
    <Modal isOpen={isOpen} contentLabel="Add Subcategory" style={modalStyle}>
      <h2 className="text-center mb-5 mt-3 font-semibold">Add Subcategory</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
         <select
          className="border rounded-md text-xs p-2 mb-3 text-gray-400"
          value={categoryId}
          onChange={(e) => setcategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryname}
            </option>
          ))}
        </select>
        <input
          className="border rounded-md text-xs p-2 mb-3"
          type="text"
          value={subcategoryname}
          placeholder="Enter subcategory name"
          onChange={(e) => setSubcategoryName(e.target.value)}
        />
        <div className="flex justify-center text-xs">
          <button type="submit" className="bg-yellow-500 px-3 p-1 rounded-md text-white">
            ADD
          </button>
          <button
            type="submit"
            className="bg-gray-100 ml-5 px-3 p-1 rounded-md"
            onClick={() => dispatch(closeModalSubCategory())}
          >
            DISCARD
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SubcategoryForm;
