import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  InboxArrowDownIcon,
  TruckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { getBuyerOrderByID } from "@/services/orderServices";
export default function BuyerOrderDetails() {
  const { orderID } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await getBuyerOrderByID(orderID);
       // console.log(orderData);
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrders();
  }, [orderDetails]); // Only run the effect when orderID changes

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // Set active step based on order status
    switch (orderDetails.orderStatus) {
      case "ready to pickup":
        setActiveStep(0);
        break;
      case "picked up":
        setActiveStep(1);
        break;
      case "review":
        setActiveStep(2);
        break;
      case "return":
        setActiveStep(2);
        break;
      default:
        setActiveStep(0);
    }
  }, [orderDetails.orderStatus]);

  const displayOrderStatus = () => {
    if (orderDetails.orderStatus === "review" || orderDetails.orderStatus === "return") {
      return "Delivered";
    }
    return orderDetails.orderStatus;
  };

  return (
    <div className="sm:mt-10 mt-4 text-custom_gray font-popins">
      <div className="text-center mb-7">
        Your Order({orderDetails.orderID}) has been{" "}
        <span className="text-primary">{displayOrderStatus()}</span>
      </div>

      <div className="w-full md:w-8/12 mx-auto px-8 py-4 mb-8">
        <Stepper activeStep={activeStep}>
          <Step>
            <InboxArrowDownIcon className="h-5 w-5 " />
            <Typography
              variant="h6"
              color={activeStep === 0 ? "green" : "gray"}
              className="absolute -bottom-[3rem] w-max text-center"
            >
              Ready to Pickup
            </Typography>
          </Step>
          <Step>
            <TruckIcon className="h-5 w-5 " />
            <Typography
              variant="h6"
              color={activeStep === 1 ? "green" : "gray"}
              className="absolute -bottom-[3rem] w-max text-center"
            >
              Picked Up
            </Typography>
          </Step>
          <Step>
            <CheckIcon className="h-5 w-5 " />
            <Typography
              variant="h6"
              color={activeStep === 2 ? "green" : "gray"}
              className="absolute -bottom-[3rem] w-max text-center"
            >
              Delivered
            </Typography>
          </Step>
        </Stepper>
      </div>

      <div className="flex justify-center mt-16">
        <div className="relative w-full sm:w-9/12 h-full text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-green-500 text-gray-100 text-md">
                <th className="pl-8 py-4 font-bold text-left">
                  <p className="font-sans text-sm antialiased font-medium leading-none">
                    Product
                  </p>
                </th>
                <th className="py-4 font-bold text-left">
                  <p className="font-sans text-sm antialiased font-medium leading-none">
                    Order Placed
                  </p>
                </th>
                <th className="py-4 font-bold text-left">
                  <p className="font-sans text-sm antialiased font-medium leading-none">
                    Delivery Date
                  </p>
                </th>
                <th className="py-4 font-bold text-left">
                  <p className="font-sans text-sm antialiased font-medium leading-none">
                    Quantity
                  </p>
                </th>
                <th className="py-4 font-bold text-left">
                  <p className="font-sans text-sm antialiased font-medium leading-none">
                    Status
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-gray-50">
                <td className="pl-8 py-4 flex items-center space-x-5">
                  <img
                    src={`https://syntecblobstorage.blob.core.windows.net/products/${orderDetails.productImageUrl}`}
                    alt={orderDetails.productTitle}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 hidden sm:block">
                    {orderDetails.productTitle}
                  </p>
                </td>
                <td className="py-4">
                  <p className="font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                    {formatDate(orderDetails.orderedDate)}
                  </p>
                </td>
                <td className="py-4">
                  <p className="font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                    {formatDate(orderDetails.deliveryDate)}
                  </p>
                </td>
                <td className="py-4">
                  <p className="font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                    {orderDetails.totalQuantity}Kg
                  </p>
                </td>
                <td className="py-4">
                  <p className="font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                    Processing
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex sm:justify-end sm:mr-36 mt-3 mb-3 text-sm justify-center mr-12 ml-12">
        <div className="w-96 border rounded-xl shadow-md p-4">
          <div className="flex justify-between mb-2">
            <p className="font-bold">Courier Charge:</p>
            <p>Rs. {orderDetails.deliveryFee}</p>
          </div>
          <hr className="my-2 border-primary" />
          <div className="flex justify-between mt-2">
            <p className="font-bold">Total:</p>
            <p>Rs. {orderDetails.totalPrice}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-sm text-gray-700">
        <div className="relative w-9/12 h-full border rounded-xl shadow-md p-4">
          <div className="flex justify-between sm:ml-16 sm:mr-16 ">
            <div>
              <p className="font-bold text-primary">Seller Details</p> <br />
              {orderDetails.farmerFName} {orderDetails.farmerLName} <br />
              <br />
              <div className="italic sm:text-sm text-xs">
                {orderDetails.farmerAddL1} <br />
                {orderDetails.farmerAddL2} <br />
                {orderDetails.farmerAddL3} <br />
                {orderDetails.farmerPhoneNumber}
              </div>
            </div>
            <div>
              <p className="font-bold text-primary">Courier Details</p> <br />
              {orderDetails.courierFName} {orderDetails.courierLName} <br />
              <br />
              <div className="italic sm:text-sm text-xs">
                {orderDetails.courierAddL1} <br />
                {orderDetails.courierAddL2} <br />
                {orderDetails.courierAddL3} <br />
                {orderDetails.courierPhoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}