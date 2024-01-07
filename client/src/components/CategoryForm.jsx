// CategoryFormModal.js
import React, { useState } from 'react';
import axios from 'axios'
import Modal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";
import { openModalCategory, closeModalCategory } from '../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CategoryFormModal = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isModalCategoryOpen);

  const [categoryname, setCategoryName] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:3001/addcategory', { categoryname });
    
        console.log('Server response:', response.data);
        toast.success(response.data.message);
        dispatch(closeModalCategory())
      } catch (error) {
        toast.error(error.response.data.error);
      }
  };

  const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Change the color here
      },
    content: {
      width: '300px',
      height:'180px',
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
      border: 'none', 
      borderRadius: '8px',
    },
  };
  

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add Category"
      style={modalStyle}
    >
      <h2 className='text-center mb-5 mt-3 font-semibold'>Add Category</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            className='border rounded-md text-xs p-2'
            type="text"
            value={categoryname}
            placeholder='Enter category name'
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className='flex justify-center mt-4 text-xs'>
           <button type="submit" className='bg-yellow-500 px-3 p-1 rounded-md text-white '>ADD</button>
           <button type="submit" className='bg-gray-100 ml-5 px-3 p-1 rounded-md' onClick={()=>dispatch(closeModalCategory())}>DISCARD</button>

          </div>
       
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
