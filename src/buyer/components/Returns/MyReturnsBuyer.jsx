import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import SellerReturnCard from '@/seller/SellerDashboard/dashboard/components/reviews/components/SellerReturnCard';
import { getReturnsForBuyer } from '@/services/returnServices';
import BuyerReturnCard from '../BuyerReturnCard';
import { jwtDecode } from 'jwt-decode';

export function MyReturnsBuyer() {
    const [buyerId, setBuyerID] = useState('');
    useEffect(() => {
        try {
            const token = sessionStorage.getItem('jwtToken');
            const decodedData = jwtDecode(token);
            setBuyerID(decodedData.email);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, []);
    const navigate = useNavigate();

    const [returns, setReturns] = useState([]);

    const fetchReturns = async () => {
        const data = await getReturnsForBuyer(buyerId);
        // console.log(data)
        setReturns(data);
    }

    useEffect(() => {
        if (buyerId) {
            fetchReturns();
        }
    }, [buyerId])

    return (
        <>
            <div className='bg-white rounded-lg px-8 py-2'>
                <h1 className='text-[#00000082]'> Return product</h1>
            </div>
            {returns.length > 0 && returns.map((item, index) => (
                <BuyerReturnCard
                    key={index}
                    type={item.productType}
                    who={item.sellerName}
                    dili={item.dili}
                    diliDate={item.diliDate}
                    iType={item.productName}
                    rq={item.rq}
                    cof={item.totalPrice}
                    Button={"Return Product"}
                    img={item.productImageUrl}
                    description={item.productDescription}
                    quantity={item.totalQuantity}
                    orderId={item.orderID}
                    path={'/buyers/view-return/'}
                />
            ))}

        </>
    );
}

export default MyReturnsBuyer;