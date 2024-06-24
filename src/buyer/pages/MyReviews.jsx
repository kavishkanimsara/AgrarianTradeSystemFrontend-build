import React, {useState, useEffect} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { getProductsToReview, getReviewHistory } from '@/services/reviewServices';
import { jwtDecode } from 'jwt-decode';

const MyReviewsPage = () => {

  const [productData, setProductData] = useState([]); 
  const [historyData, setHistoryData] = useState([]);
  const [buyerID, setBuyerID] = useState('');
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
   const productHistory = await getProductsToReview(buyerID);
   const reviewHistory = await getReviewHistory(buyerID)

   setProductData(productHistory);
   setHistoryData(reviewHistory);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const NavLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: 'none',
      backgroundColor: isActive ? 'rgb(102 187 106 / var(--tw-bg-opacity))' : 'transparent',
      color: isActive ? 'white' : 'black',
      padding: '3px',
      borderRadius: '8px',  
    };
  };

  return (
    <div>
      <nav className='flex gap-6 bg-white py-1 px-16 rounded-lg'>
        <NavLink to='to-review' style={NavLinkStyles}   >
          To Review ({productData.length})
        </NavLink>
        <NavLink to='history' style={NavLinkStyles}>
          History ({historyData.length})
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MyReviewsPage;