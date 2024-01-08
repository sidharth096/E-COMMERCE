import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getproductbyId/${productId}`);
        const data = response.data;
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div className="flex">
      {product ? (
        <>
          <div className="w-1/2">
            {/* Display images on the left side */}
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${index + 1}`} className="w-full mb-4" />
            ))}
          </div>
          <div className="w-1/2 p-4">
            {/* Display details on the right side */}
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-sky-700 mb-4">${product.variants[0].price}</p>
            {/* Add more details based on your product structure */}
          </div>
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
