import React from 'react'
import MainNav from '../components/MainNav'
import { useLocation } from 'react-router-dom';
import Filterbar from '../components/Filterbar'
import ProductsCard from '../components/ProductsCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SortBar from '../components/SortBar'
import LoadingProducts from '@/courier/components/LoadingProducts'
import { getAllProductsPage, getSortedProducts } from '@/services/productServices'
import { set } from 'date-fns'
import { PaginationItem } from '@mui/material';
import { PaginationBar } from '../components/PaginationBar';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductList = () => {
  const query = useQuery();
  const searchTerm = query.get('search') || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async (pageNum) => {
    try {
      let data;
      if (sortedProducts === 'asc' || sortedProducts === 'desc') {
        data = await getSortedProducts(sortedProducts);
      } else {
        let response = await getAllProductsPage(pageNum, 10);
        setTotalPages(response.totalPages);
        data = response.items;
      }
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [sortedProducts]);
  
  useEffect(() => {
    if (searchTerm) {
      const searchProducts = async () => {
        try {
          const data = await getSearchProducts(searchTerm);
          setFilteredProducts(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      searchProducts();
    }
  }, [searchTerm]);

  const handlePageNumber= (pageNum) => {
    setPage(pageNum);
    fetchProducts(pageNum);
  }

  const applyFilters = (filteredData) => {
    setFilteredProducts(filteredData);
  };

  const handleSearchData = async (searchData) => {
    setFilteredProducts(searchData);
  };
  // sort products based on selected sorting option
  const handleSortedData = (sortedData) => {
    if (sortedData === 'asc' || sortedData === 'desc') {
      setSortedProducts(sortedData);
    } else {
      setSortedProducts(null);
    }
  };
  return (
    <div>
      <MainNav getSearchResults={handleSearchData} />
      <SortBar handleSortedData={handleSortedData} />
      <div className='grid grid-cols-5'>
        <Filterbar items={products} applyFilters={applyFilters} />
        <div className=' col-span-4 overflow-y-auto bg-secondary min-h-screen'>
          <div className='flex flex-wrap py-4  px-4 gap-4'>
            {filteredProducts.length > 0 ?
              filteredProducts.map((product, index) => {
                const key = product.productID || index
                return (
                  <ProductsCard
                    key={key}
                    productID={product.productID}
                    productTitle={product.productTitle}
                    productImageUrl={product.productImageUrl}
                    minimumQuantity={product.minimumQuantity}
                    availableStock={product.availableStock}
                    unitPrice={product.unitPrice}
                  />
                );
              },
              ) :
              <LoadingProducts />
            }
          </div>
          <div className='flex justify-center py-8 mt-4'>
            <PaginationBar totalPages={totalPages} setPage={handlePageNumber}/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductList