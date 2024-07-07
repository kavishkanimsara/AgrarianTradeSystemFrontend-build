import React, { useState } from 'react';
import { Radio, Typography } from "@material-tailwind/react";
import { Title } from '@/seller/SellerDashboard/dashboard/forms/FormComponents';
import { fruits, productTypes, vegetables } from '@/data/product-type-data';

const Filterbar = ({ items, applyFilters,handleSelectType ,handlSelectCategory }) => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to apply filters and pass filtered data to parent component
  const handleApplyFilters = () => {
    let filteredData = items;

    if (selectedProductType) {
      filteredData = filteredData.filter(product => product.productType === selectedProductType);
    }
    if (selectedCategory) {
      filteredData = filteredData.filter(product => product.category === selectedCategory);
    }

    // Pass the filters and filtered data to the parent
    applyFilters(filteredData, { selectedProductType, selectedCategory });
  };

  // Handle product type change
  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
    setSelectedCategory(''); 
    handleSelectType(event.target.value);
    handlSelectCategory('');
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    handlSelectCategory(event.target.value);
    
  };

  return (
    <div className='px-6 border-r border-gray-200'>
      <form>
        {/* Select product type */}
        <Title title="Select Type"></Title>
        <div className='max-w-min'>
          {productTypes.map(type => (
            <Radio
              key={type.value}
              name="type"
              value={type.value}
              checked={selectedProductType === type.value}
              onChange={handleProductTypeChange}
              label={
                <Typography
                  color="blue-gray"
                  className="font-normal text-blue-gray-700"
                >
                  {type.label}
                </Typography>
              }
            />
          ))}
        </div>

        {/* Select category */}
        <div className='mt-8'>
          <Title title="Select Category"></Title>
          <div className="w-full mt-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className='overflow-y-scroll h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 bg-gray-50 focus:ring-blue-500 block p-2.5'
            >
              <option value="">All</option>
              {selectedProductType === 'vegetable' ? (
                vegetables.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))
              ) : selectedProductType === 'fruit' ? (
                fruits.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))
              ) : null}
            </select>
          </div>
        </div>

        {/* Apply filters button */}
        <button
          type='button'
          className="mt-8 bg-primary w-full rounded-md text-white py-2 text-sm hover:bg-green-500"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Filterbar;
