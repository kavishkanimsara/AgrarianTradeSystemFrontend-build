import { Rating } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { getReviewsForProduct } from '@/services/reviewServices';
import AllReview from './Allreview';

const Review = ({ id }) => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const [noOfRatings, setNoOfRatings] = useState({
    one: 0, two: 0, three: 0, four: 0, five: 0
  })
  const [ratio, setRatio] = useState(100);

  const getReviews = async () => {
    const data = await getReviewsForProduct(id);
    console.log("Reviews 01:", data);
    setReviews(data);

    setCount(data.length);

    let total = 0;

    data.map((r) => {
      console.log(r)
      let val = r.productRating;
      total += val;

      if (val === 1) {
        setNoOfRatings({ ...noOfRatings, one: noOfRatings.one++ });
      }
      if (val === 2) {
        setNoOfRatings({ ...noOfRatings, two: noOfRatings.two++ });
      }
      if (val === 3) {
        setNoOfRatings({ ...noOfRatings, three: noOfRatings.three++ });
      }
      if (val === 4) {
        setNoOfRatings({ ...noOfRatings, four: noOfRatings.four++ });
      }
      if (val === 5) {
        setNoOfRatings({ ...noOfRatings, five: noOfRatings.five++ });
      }
    })

    console.log("Total: ", total)

    setRating(total / data.length);

    setRatio(100/data.length);

  }

  useEffect(() => {
    getReviews()
  }, [id])

  return (
    <div>
      {reviews && reviews.length > 0 && <div className='bg-white px-8 py-10 rounded-lg my-4 m-8'>
        <div className='flex gap-28'>
          <div className='pr-72 border-r-2'>
            <p className='my-8'>Rating & Reviews</p>
            <div className='bg-orange-400'>
              {rating} Top Rated
            </div>
            <Rating value={rating} readonly />
            <p>{count} Ratings</p>
          </div>
          <div>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={index} className="flex items-center mt-4 w-full">
                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">{rating} star</a>
                <div className="w-96 h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                  {rating === 1 ? <div className="h-5 bg-orange-400 rounded" style={{ width: `${noOfRatings.one * ratio}%` }}></div>
                    : rating === 2 ? <div className="h-5 bg-orange-400 rounded" style={{ width: `${noOfRatings.two * ratio}%` }}></div>
                      : rating === 3 ? <div className="h-5 bg-orange-400 rounded" style={{ width: `${noOfRatings.three * ratio}%` }}></div>
                        : rating === 4 ? <div className="h-5 bg-orange-400 rounded" style={{ width: `${noOfRatings.four * ratio}%` }}></div>
                          : <div className="h-5 bg-orange-400 rounded" style={{ width: `${noOfRatings.five * ratio}%` }}></div>}
                </div>
                {rating === 1 ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{noOfRatings.one * ratio}%</span>
                  : rating === 2 ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{noOfRatings.two * ratio}%</span>
                    : rating === 3 ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{noOfRatings.three * ratio}%</span>
                      : rating === 4 ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{noOfRatings.four * ratio}%</span>
                        : <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{noOfRatings.five * ratio}%</span>}
              </div>
            ))}
          </div>
        </div>
        <div className='pt-20'>
          <AllReview id={id} />
        </div>
      </div>}
    </div>
  );
};

export default Review;
