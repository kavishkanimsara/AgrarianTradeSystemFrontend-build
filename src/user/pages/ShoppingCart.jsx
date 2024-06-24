import React, { useEffect, useState } from 'react'
import MainNav from '../components/MainNav'
import CheckoutCard from '../components/CheckoutCard'
import { CartTable } from '../components/CartTable';
import { getCartItems } from '@/services/productServices';
import { jwtDecode } from 'jwt-decode';
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [buyerID, setBuyerID] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        const cartData = await getCartItems(decodedData.email);
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartItems();
  }, [cartItems]);

  const handleDeleteItem = (item) => {
    setCartItems(item);
  }

  return (
    <>
      <MainNav />
      <div className='px-8 bg-secondary'>
        <div className='md:grid grid-cols-3'>
          <div className='md:col-span-2 mx-8 mt-4'>
            <CartTable cartItems={cartItems} handleDeleteItem={handleDeleteItem} />
          </div>
          <div className='mx-3 mt-5'>
            <CheckoutCard cartItems={cartItems} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart