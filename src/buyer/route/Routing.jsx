import {
  MyReturns,
  MyReviews,
  Profile,
} from "@/seller/SellerDashboard/dashboard";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddReviewCard } from "../components/Reviews/ToReview";
import ReviewForm from "../components/reuseble/ReviewForm";
import ReturnForm from "../components/Returns/ReturnForm";
import BuyerOrderDetails from "../components/BuyerOrderDetails";
import EditReview from "../components/Reviews/EditReview";
import MyReviewsPage from "../pages/MyReviews";
import ReturnFormCard from "@/seller/SellerDashboard/dashboard/components/reviews/components/ReturnFormCard";
import History from "../components/Reviews/History";
import { MyReturnsBuyer } from "../components/Returns/MyReturnsBuyer";

import MyOrders from "../pages/MyOrders";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="my-reviews" element={<MyReviewsPage />}>
          <Route index element={<AddReviewCard />} />
          <Route path="to-review" element={<AddReviewCard />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="" element={<ReturnFormCard />} />
        {/* <Route path="history" element={<History />} /> */}
        <Route path="/view-return/:id" element={<ReturnFormCard />} />
        <Route path="/my-returns" element={<MyReturnsBuyer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-review/:id" element={<ReviewForm />} />
        
        <Route
          path="my-orders/:orderID"
          element={<BuyerOrderDetails />}
        ></Route>
        <Route path="/review/edit/:reviewId/:id" element={<EditReview />} />
        {/* <Route path='/edit' element={<HistoryForm/>} /> */}
      </Routes>
    </>
  );
};
export default Routing;
