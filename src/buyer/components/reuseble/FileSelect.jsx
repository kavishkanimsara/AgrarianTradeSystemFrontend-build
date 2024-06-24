import React, { useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';


const FileSelect = ({selectedFiles, setSelectedFiles}) => {

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

    return (
        <>
        <div className='flex justify-center'>
        <label htmlFor='photo' className='bg-[#F7FFF1] rounded-lg cursor-pointer py-4'>
        <MdPhotoCamera className='text-[#44BD32] h-[45px] w-auto relative px-8 mx-auto ' />
         <p className=' mx-auto px-8'>Add Photos</p>
        <input
          type='file'
          id='photo'
          className='hidden'
          onChange={handleFileChange}
          accept='image/*'
          multiple
        />
      </label>
        </div>
        <div>
        {selectedFiles.map((file, index) => (
          <div key={index} className='flex items-center'>
            <img
              src={URL.createObjectURL(file)}
              alt={`Selected ${index + 1}`}
              className='max-w-full h-auto mr-2'
              style={{ maxWidth: '100px' }}
            />
            <button
              type='button'
              onClick={() => handleRemove(index)}
              className='bg-red-500 text-white px-2 py-1 rounded'
            >
              Remove
            </button>
          </div>
        ))}

        </div>
        </>
    )
}

export default FileSelect