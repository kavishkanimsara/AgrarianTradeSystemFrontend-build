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
  const [filters, setFilters] = useState();
  const[selectedProductType,setSelectedProductType] = useState('');
  const[selectedCategory,setSelectedCategory] = useState('');

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
      // Apply filters to the fetched data
      if (selectedProductType) {
        data = data.filter(product => product.productType === selectedProductType);
      }
      if (selectedCategory) {
        data = data.filter(product => product.category === selectedCategory);
      }
      setProducts(data);
      console.log(data)
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [sortedProducts, page]);

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

  const handlePageNumber = (pageNum) => {
    setPage(pageNum);
  };

  const applyFilters = (filteredData, appliedFilters) => {
    setFilteredProducts(filteredData);
    setFilters(appliedFilters);
  };

  const handleSearchData = async (searchData) => {
    setFilteredProducts(searchData);
  };

  const handleSortedData = (sortedData) => {
    if (sortedData === 'asc' || sortedData === 'desc') {
      setSortedProducts(sortedData);
    } else {
      setSortedProducts(null);
    }
  };

  //handleSelectType ,handlSelectCategory
  const handleSelectType = (type) => {
    setSelectedProductType(type);
    console.log('Selected Product Type:', type);
  };
  const handlSelectCategory = (category) => {
    setSelectedCategory(category);
    console.log('Selected Category:', category);
  }

  return (
    <div>
      <MainNav getSearchResults={handleSearchData} />
      <SortBar handleSortedData={handleSortedData} />
      <div className='grid grid-cols-5'>
        <Filterbar items={products} applyFilters={(filteredData) => applyFilters(filteredData, filters)} handlSelectCategory={handlSelectCategory} handleSelectType={handleSelectType} />
        <div className=' col-span-4 overflow-y-auto bg-secondary min-h-screen'>
          <div className='flex flex-wrap py-4 px-4 gap-4'>
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
              }) :
              <LoadingProducts />
            }
          </div>
          <div className='flex justify-center py-8 mt-4'>
            <PaginationBar totalPages={totalPages} setPage={handlePageNumber} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;
