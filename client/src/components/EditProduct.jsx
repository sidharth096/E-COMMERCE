import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalEditProduct } from '../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSingleProduct } from '../redux/slices/singleProductSlice';

const EditProduct = (productIdForEdit) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isModalProductEdidOpen);
  const product = useSelector((state)=>state.singleproduct.singleproduct);

  const [title, setTitle] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ ram: '', price: '', quantity: '' }]);
  const [images, setImages] = useState([]);
  const [serverImages, setServerImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [subcategoriesList, setSubcategoriesList] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getsubcategories');
      
        setSubcategoriesList(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (productIdForEdit && product) {
      setTitle(product.title || '');
      setSubcategory(product.subcategory || '');
      setDescription(product.description || '');
      setVariants(product.variants || [{ ram: '', price: '', quantity: '' }]);
      setServerImages(product.images ? product.images.map(imageUrl => ({ url: imageUrl })) : []);
    }
  }, [productIdForEdit, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subcategory', subcategory);
      formData.append('description', description);
      formData.append('variants', JSON.stringify(variants));
        

      images.forEach((image, index) => {
        formData.append('images', image);
      });
  
      const response = await axios.post(`http://localhost:3001/editproduct/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      toast.success(response.data.message);
      dispatch(setSingleProduct(response.data.data))
      dispatch(closeModalEditProduct());
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', price: '', quantity: '' }]);
  };

  const handleVariantChange = (index, field, value) => {
    
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
     setServerImages([])
     
    if (selectedImages.length + files.length > 3) {
        toast.error(`upload a maximum 3 images`);
        return;
      }
     setImages([...images, ...files]);

     const selectedImagePreviews = Array.from(files).map((file) => URL.createObjectURL(file));
     setSelectedImages([...selectedImages, ...selectedImagePreviews]);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      width: '600px',
      height: '500px',
      margin: 'auto',
      top: '60%',
      transform: 'translateY(-50%)',
      border: 'none',
      borderRadius: '8px',
    },
  };

  return (
    <Modal isOpen={isOpen} contentLabel="Add Product" style={modalStyle}>
      <h2 className="text-center mb-5 mt-3 font-semibold">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-3 flex items-center">
          <label className="w-1/3 pr-4 text-xs mb-1 text-gray-400">Title :</label>
          <div className="w-2/3">
            <input
              className="border rounded-md text-xs p-2 w-full"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 flex items-center">
          <label className="w-1/3 pr-4 text-xs mb-1 text-gray-400">Variants :</label>
          <div className="w-2/3">
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2 mt-2 items-center">
                <div className="w-1/3">
                  <label className="text-xs mb-1 text-gray-400">Ram:</label>
                </div>
                <div className="w-2/3">
                  <input
                    className="border rounded-md text-xs p-2 w-full"
                    type="text"
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="text-xs mb-1 text-gray-400">Price:</label>
                </div>
                <div className="w-2/3">
                  <input
                    className="border rounded-md text-xs p-2 w-full"
                    type="text"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="text-xs mb-1 text-gray-400">Quantity:</label>
                </div>
                <div className="w-2/3">
                  <input
                    className="border rounded-md text-xs p-2 w-full"
                    type="text"
                    value={variant.quantity}
                    onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-white bg-black p-1 px-2 rounded-md mt-2"
                onClick={addVariant}
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3 flex items-center">
        <label className="w-1/3 pr-4 text-xs mb-1 text-gray-400">Subcategory :</label>
        <div className="w-2/3">
      
          <select
            className="border rounded-md text-xs p-2 w-full"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {subcategoriesList.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.subcategoryname}
              </option>
            ))}
          </select>
        </div>
      </div>
        <div className="mb-3 flex items-center">
          <label className="w-1/3 pr-4 text-xs mb-1 text-gray-400">Description :</label>
          <div className="w-2/3">
            <textarea
              className="border rounded-md text-xs p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 flex items-center">
          <label className="w-1/3 pr-4 text-xs mb-1 text-gray-400">Upload Images :</label>
          <div className="w-2/3 flex items-center">
            {serverImages.length > 0 && (
              <div className="mt-2 rounded-md p-2 flex overflow-x-auto">
                {serverImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Selected ${index + 1}`}
                    className="max-h-16 max-w-16 mx-2 border border-gray-400 rounded-md object-cover"
                  />
                ))}
              </div>
            )}
             {selectedImages.length > 0 && (
              <div className="mt-2 rounded-md p-2 flex overflow-x-auto">
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="max-h-16 max-w-16 mx-2 border border-gray-400 rounded-md object-cover"
                  />
                ))}
              </div>
            )}

            <label htmlFor="fileInput" className="mt-2 p-2 cursor-pointer">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4FD4zM5aLH3NSh9CW2iEIICb_OaXXQfNJQ&usqp=CAU"
                alt="Choose Files"
                className="max-h-16 max-w-16 border border-gray-400 rounded-md object-cover"
              />
            </label>
            <input
              id="fileInput"
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 text-xs">
          <button type="submit" className="bg-yellow-500 px-3 p-1 rounded-md text-white">
            Update
          </button>
          <button
            type="submit"
            className="bg-gray-100 ml-5 px-3 p-1 rounded-md"
            onClick={() => dispatch(closeModalEditProduct())}
          >
            DISCARD
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProduct;
