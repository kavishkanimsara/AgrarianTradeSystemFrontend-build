import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '@/seller/SellerDashboard/dashboard/components/reviews/components/ReviewCard';
import { getProductsToReview, getReviewHistory } from '@/services/reviewServices';
import { jwtDecode } from 'jwt-decode';

export const AddReviewCard = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [buyerId, setBuyerID] = useState('');
  useEffect(() => {
    try{
      const token = sessionStorage.getItem('jwtToken');
      const decodedData = jwtDecode(token);
      setBuyerID(decodedData.email);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const productsToReview = await getProductsToReview(buyerId);

      console.log(productsToReview);

      setProductData(productsToReview);
      // setHistoryData(reviewHistory);
    } catch (error) {
      console.error('Error fetching products or history:', error);
      // Handle errors appropriately, e.g., show a notification to the user
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch only once when the component mounts


  return (
    <>

      {productData.map((item, index) => (
        <ReviewCard
          key={index}
          id={item.orderID}
          productId={item.productID}
          type={item.productType}
          iType={item.productName}
          Button={"Review"}
          img={item.productImageUrl}
          description={item.productDescription}
          stock={item.availableStock}
          pDate={item.orderedDate?.split("T")[0]}
          quantity={item.totalQuantity}
        />
      ))}
    </>

  )

}
