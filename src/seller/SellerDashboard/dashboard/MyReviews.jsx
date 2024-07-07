import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SellerReviewCard from './components/reviews/components/SellerReviewCard';
import { getReviewsForFarmer } from '@/services/reviewServices';
import { jwtDecode } from 'jwt-decode';

export function MyReviews() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [sellerID, setSellerID] = useState('');
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const decodedData = jwtDecode(token);
      console.log("DecodedData: ", decodedData);
      setSellerID(decodedData.email);
      fetchReviews(decodedData.email);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const fetchReviews = async (sellerID) => {
    const data = await getReviewsForFarmer(sellerID);
    setReviews(data);
  }


  return (
    <>
      <div className='bg-white rounded-lg px-8 py-2'>
        <h1 className='text-[#00000082]'> View Reviws </h1>
      </div>

      {reviews && reviews.map((item, index) => (
        <SellerReviewCard
          key={index}
          id={item.orderID}
          productId={item.productID}
          type={item.productType}
          iType={item.productTitle}
          Button={"View"}
          img={item.productImageUrl}
          description={item.productDescription}
          stock={item.availableStock}
          pDate={item.orderedDate?.split("T")[0]}
          quantity={item.totalQuantity}
        />
      ))}
    </>


  );
}

export default MyReviews;