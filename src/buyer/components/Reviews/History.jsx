import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getReviewHistory } from '@/services/reviewServices';
import { jwtDecode } from 'jwt-decode';

export function DefaultRating({ value }) {
  return <Rating value={value} />;
}

function formatDate(dateString) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  const monthName = monthNames[month - 1];

  return `${day} ${monthName} ${year}`;
}

const History = () => {
  const [buyerId, setBuyerID] = useState('');
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const decodedData = jwtDecode(token);
      console.log("DecodedData:", decodedData)
      setBuyerID(decodedData.email);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const reviewHistory = await getReviewHistory(buyerId);

      console.log("Rviews:", reviewHistory);

      setReviews(reviewHistory);
    } catch (error) {
      console.error('Error fetching products or history:', error);
      // Handle errors appropriately, e.g., show a notification to the user
    }
  }

  useEffect(() => {
    if (buyerId) {
      fetchReviews();
    }
  }, [buyerId]);
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div className='bg-white px-8 py-5 rounded-lg my-2 pb-1'>
            <div className='mb-5'>
              <h1 className='my-2 capitalize'>{review.productType} Gallery </h1>
              <p>Purchase date {formatDate(review.reviewDate.split('T')[0])}</p>
            </div>
            <div className='flex w-full gap-4 items-end'>
              <img src={"https://syntecblobstorage.blob.core.windows.net/reviews/" + review.reviewImageUrl}
                alt="" className='w-[160px] h-[120px]' />

              <div className='w-full px-3'>
                <h1 className='font-semibold text-gray-800 text-lg my-3'>{review.productTitle}</h1>
                <p className='text-blue-gray-500'>{review.comment}</p>
              </div>
            </div>

            <div className='flex'>
              <div className='pr-13 mr-44 py-2'>
                <DefaultRating value={Math.floor((review.sellerRating + review.deliverRating + review.productRating) / 3)} />
              </div>

              <div className='ml-12 '>

                <Button className="color bg-green-400 mx-96" onClick={() => navigate('/buyers/review/edit/' + review.reviewId + "/" + review.orderID)}  >Edit</Button>
              </div>
            </div>
          </div>)
        )) : <div>Loading...</div>}

    </>
  );
}

export default History;
