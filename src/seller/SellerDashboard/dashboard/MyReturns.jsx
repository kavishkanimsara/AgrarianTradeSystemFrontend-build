import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import ReturnCard from './components/reviews/components/SellerReturnCard';
import SellerReturnCard from './components/reviews/components/SellerReturnCard';
import { getReturnsForBuyer, getReturnsForfarmer } from '@/services/returnServices';
import { BUYER_ID, FARMER_ID } from '@/usersID';
import { jwtDecode } from 'jwt-decode';

export function MyReturns() {

  const navigate = useNavigate();

  const [returns, setReturns] = useState([]);
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const decodedData = jwtDecode(token);
      console.log("DecodedData: ", decodedData);
      fetchReturns(decodedData.email);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const fetchReturns = async (farmerId) => {
    const data = await getReturnsForfarmer(farmerId);
    console.log(data)
    // Use a Map to store the first occurrence of each orderID
    let orderMap = new Map();

    data.forEach(order => {
      if (!orderMap.has(order.orderID)) {
        orderMap.set(order.orderID, order);
      }
    });

    // Convert the Map back to an array to get the filtered list
    let filteredOrders = Array.from(orderMap.values());

    setReturns(filteredOrders);
  }


  return (
    <>
      <div className='bg-white rounded-lg px-8 py-2'>
        <h1 className='text-[#00000082]'> Return product</h1>
      </div>
      {returns.length > 0 && returns.map((item, index) => (
        <SellerReturnCard
          key={index}
          type={item.productType}
          who={item.sellerName}
          orderDate={item.orderedDate}
          dili={item.dili}
          diliDate={item.returnDate}
          iType={item.productTitle}
          rq={item.rq}
          cof={item.returnQuantity}
          Button={"View"}
          img={item.productImageUrl}
          description={item.productDescription}
          quantity={item.totalQuantity}
          orderId={item.orderID}
          path={''}
          returnPrice={item.returnPrice}
        />
      ))}

    </>
  );
}

export default MyReturns;