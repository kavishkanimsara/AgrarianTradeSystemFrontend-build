import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getReviewsForFarmer } from '@/services/reviewServices';
import { FARMER_ID } from '@/usersID';
import SellerReviewCard from '@/seller/SellerDashboard/dashboard/components/reviews/components/SellerReviewCard';



export function MyReviews() {
  const farmerId = FARMER_ID;
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const data = await getReviewsForFarmer(farmerId);
    setReviews(data);
  }

  useEffect(() => {
    fetchReviews()
  }, [])

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