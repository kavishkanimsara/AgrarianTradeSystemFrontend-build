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
        console.log(orderData);
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
      case "Ready to Pickup":
        setActiveStep(0);
        break;
      case "Picked Up":
        setActiveStep(1);
        break;
      case "Delivered":
        setActiveStep(2);
        break;
      default:
        setActiveStep(0);
    }
  }, [orderDetails.orderStatus]);

  return (
    <div className="sm:mt-10 mt-4 text-custom_gray font-popins">
      <div className="text-center mb-7">
        Your Order({orderDetails.orderID}) has been{" "}
        <span className="text-primary">{orderDetails.orderStatus}</span>
      </div>

      <div className="w-8/12 mx-auto px-24 py-4 mb-8">
        <Stepper activeStep={activeStep}>
          <Step
            className={` ${activeStep === 0 ? "border-8 border-red-200 " : ""}`}
          >
            <InboxArrowDownIcon className="h-5 w-5" />
            <Typography
              variant="h6"
              color={activeStep === 0 ? "green" : "gray"}
              className="absolute -bottom-[3rem] w-max text-center"
            >
              Ready to Pickup
            </Typography>
          </Step>
          <Step
            className={` ${activeStep === 1 ? "border-8 border-red-200" : ""}`}
          >
            <TruckIcon className="h-5 w-5" />
            <Typography
              variant="h6"
              color={activeStep === 1 ? "green" : "gray"}
              className="absolute -bottom-[3rem] w-max text-center"
            >
              Picked Up
            </Typography>
          </Step>
          <Step
            className={` ${activeStep === 2 ? "border-8 border-red-200" : ""}`}
          >
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

      <div className="flex justify-center">
        <div className="relative w-9/12 h-full text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-10 hidden sm:block">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <div className="pl-8 grid grid-cols-5 gap-x-6 gap-4 bg-green-500 text-gray-100 text-md">
                  <th className="pl-6 col-span-1 pt-8 pb-6 font-bold">
                    <p className="block font-sans text-sm antialiased font-medium leading-none">
                      Product
                    </p>
                  </th>
                  <th className="col-span-1 pt-8 pb-6 font-bold">
                    <p className="block font-sans text-sm antialiased font-medium leading-none">
                      Order Placed
                    </p>
                  </th>
                  <th className="col-span-1 pt-8 pb-6 font-bold">
                    <p className="block font-sans text-sm antialiased font-medium leading-none">
                      Delivery Date
                    </p>
                  </th>
                  <th className="col-span-1 pt-8 pb-6 font-bold">
                    <p className="block font-sans text-sm antialiased font-medium leading-none">
                      Quantity
                    </p>
                  </th>
                  <th className="col-span-1 pt-8 pb-6 font-bold">
                    <p className="block font-sans text-sm antialiased font-medium leading-none">
                      Status
                    </p>
                  </th>
                </div>
              </tr>
            </thead>

            <tbody>
              <tr>
                <div className="pl-8 pr-8 grid grid-cols-5 gap-x-6 gap-4 border-b border-blue-gray-50">
                  <td class="p-3 col-span-1 ">
                    <div class="flex space-x-5  ">
                      <Avatar
                        src={
                          "https://syntecblobstorage.blob.core.windows.net/products/" +
                          orderDetails.productImageUrl
                        }
                        size="sm"
                      />
                      <p class="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {orderDetails.productTitle}
                      </p>
                    </div>
                  </td>

                  <td className="p-3 col-span-1">
                    <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                      {formatDate(orderDetails.orderedDate)}
                    </p>
                  </td>

                  <td className="p-3 col-span-1">
                    <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                      {formatDate(orderDetails.deliveryDate)}
                    </p>
                  </td>

                  <td className="p-3 col-span-1">
                    <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 pl-3">
                      {orderDetails.totalQuantity}Kg
                    </p>
                  </td>

                  <td className="p-3 col-span-1">
                    <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1 pl-4">
                      Processing
                    </p>
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mr-36 mt-3 mb-3 text-sm">
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

      <div className="flex justify-center text-sm">
        <div className="relative w-9/12 h-full border rounded-xl shadow-md p-4">
          <div className="flex justify-between ml-16 mr-16">
            <div>
              <p className="font-bold">Seller Details</p> <br />
              {orderDetails.farmerFName} {orderDetails.farmerLName} <br />
              <br />
              <div className="italic sm:text-sm text-xs">
                {orderDetails.farmerAddL1} <br />
                {orderDetails.farmerAddL2} <br />
                {orderDetails.farmerAddL3}
              </div>
            </div>
            <div>
              <p className="font-bold">Courier Details</p> <br />
              {orderDetails.courierFName} {orderDetails.courierLName} <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
