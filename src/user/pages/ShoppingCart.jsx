import React, { useEffect, useState } from 'react'
import MainNav from '../components/MainNav'
import CheckoutCard from '../components/CheckoutCard'
import { CartTable } from '../components/CartTable';
import { getCartItems } from '@/services/productServices';
import { jwtDecode } from 'jwt-decode';
import { set } from 'date-fns';
import CartOrderModal from '../components/CartOrderModel';
import {
  Alert
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [buyerID, setBuyerID] = useState('');
  const [open, setOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
//retrieve cart items and buyer user id from the database
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        const cartData = await getCartItems(decodedData.email);
        setCartItems(cartData);
        setBuyerID(decodedData.email);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartItems();
  }, [cartItems]);
//delete item from the cart
  const handleDeleteItem = (item) => {
    setCartItems(item);
  }
//open the order modal
  const modelOpenHandler = () => {
   open ? setOpen(false) :
    setOpen(true);   
  };
//handle the success order alert
  const handleSuccessOrder = (success) => {
    setSuccessOrder(success);
  }
  return (
    <>
      <MainNav />
      <Alert
        icon={<Icon />}
        open={successOrder}
        onClose={()=>handleSuccessOrder(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="rounded-none border-l-4 border-[#ee7f25] bg-[#c9812e]/10 font-medium text-[#ee7f25] max-w-2xl mx-12"
      >
        Your orders have been successfully placed! <Link to="/buyers/my-orders" className="text-[#ff9f50] font-bold underline ml-2">View My Orders</Link>
      </Alert>
      <CartOrderModal open={open} setOpen={modelOpenHandler} cartItems={cartItems} buyerID={buyerID} setSuccessOrder={handleSuccessOrder}  />
      <div className='px-8 bg-secondary'>
        <div className='md:grid grid-cols-3'>
          <div className='md:col-span-2 mx-8 mt-4'>
            <CartTable cartItems={cartItems} handleDeleteItem={handleDeleteItem} />
          </div>
          <div className='mx-3 mt-5'>
            <CheckoutCard cartItems={cartItems} openModel={modelOpenHandler} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart