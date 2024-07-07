// src/ReviewForm.js
import React, { useEffect, useState } from 'react';
import { Rating } from "@material-tailwind/react";
import FileSelect from './FileSelect';
import { useNavigate, useParams } from 'react-router-dom';
import { addReview, getOrderDetails } from '@/services/reviewServices';
import { formatDate } from '@/seller/SellerDashboard/dashboard/components/reviews/components/ReviewCard';
import { set } from 'date-fns';

export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const[loading,setLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    SellerRating: 0,
    DeliverRating: 0,
    ProductRating: 0,
    Comment: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderDetails(id);
        setProduct(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();

    console.log("Order ID:", id);
  }, [id]);

  const addFormData = () => {
    const formData = new FormData();
    formData.append("OrderID", id);
    formData.append("SellerRating", reviewData.SellerRating);
    formData.append("DeliverRating", reviewData.DeliverRating);
    formData.append("ProductRating", reviewData.ProductRating);
    formData.append("Comment", reviewData.Comment);
    if (selectedFiles.length > 0) {
      formData.append("file", selectedFiles[0]);
    }

    handleAddReview(formData);
  };

  const handleAddReview = async (formData) => {
    setLoading(true);
    try {
      const response = await addReview(formData);
      if (response.status === 200) {
        console.log('Review added successfully!', response);
        setLoading(false);
        navigate('/buyers/my-reviews');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div className="bg-white px-8 py-5 rounded-lg my-2 pb-1">
          <div className="mb-5">
            <h1 className="my-2 capitalize">{product.productType} Gallery</h1>
            <p>Purchased on {formatDate(product.orderedDate.split('T')[0])}</p>
          </div>
          <div className="flex w-full gap-4 items-end">
            <img
              src={`https://syntecblobstorage.blob.core.windows.net/products/${product.productImageUrl}`}
              alt={product.productTitle}
              className="w-[160px] h-[120px]"
            />
            <div className="w-full px-3">
              <h1 className="font-semibold text-gray-800 text-lg my-3">
                {product.productTitle} - {product.totalQuantity}Kg
              </h1>
              <p className="text-blue-gray-500">{product.productDescription}</p>
            </div>
          </div>
          <div className="flex gap-20 my-8">
            <h1>Product rating</h1>
            <div className="pr-4">
              <Rating
                value={reviewData?.ProductRating}
                onChange={(value) =>
                  setReviewData((prev) => ({ ...prev, ProductRating: value }))
                }
              />
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}

      <div className="bg-white rounded-lg py-5">
        <div className="flex gap-20 px-8">
          <h1>Seller Service</h1>
          <Rating
            value={reviewData?.SellerRating}
            onChange={(value) =>
              setReviewData((prev) => ({ ...prev, SellerRating: value }))
            }
          />
        </div>
        <div className="flex gap-16 px-8 pt-3">
          <h1>Delivery Service</h1>
          <Rating
            value={reviewData?.DeliverRating}
            onChange={(value) =>
              setReviewData((prev) => ({ ...prev, DeliverRating: value }))
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-lg my-2 py-5">
        <h1 className="px-8">Add Photos</h1>
        <FileSelect selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
      </div>

      <div className="bg-[#ffff] rounded-lg">
        <div className="flex mx-6 py-5 pt-5">
          <h1>Add Written Review</h1>
          <div className="ml-auto opacity-60">
            <h1>0/500</h1>
          </div>
        </div>
        <div className="text-center">
          <input
            type="text"
            placeholder="How’s the Quality of the product?"
            className="w-[600px] h-12 bg-[#F7FFF1] rounded-lg text-center"
            onChange={(e) =>
              setReviewData((prev) => ({ ...prev, Comment: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="bg-white text-center my-2 rounded-lg pt-6 pb-4">
        <button
          type="submit"
          className="bg-[#44BD32] px-28 rounded-lg h-9 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            addFormData();
          }}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
