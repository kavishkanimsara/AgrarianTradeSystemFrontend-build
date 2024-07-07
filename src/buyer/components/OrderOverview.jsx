import React from "react";
import { Avatar } from "@material-tailwind/react";

const OrderOverview = ({ orderDetails, type }) => {
  if (!orderDetails) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <>
      <div className="sm:mt-20 mt-8 text-custom_gray">
        <div className="flex">
          <div className="sm:mb-10 mb-7 sm:ml-60 ml-5 font-bold sm:text-2xl text-xl italic ">
            Order Details
          </div>
        </div>
        <div className="flex justify-center  sm:space-x-8 space-x-2 items-center">
          <Avatar
            src={
              "https://syntecblobstorage.blob.core.windows.net/products/" +
              orderDetails.productImageUrl
            }
            style={{ width: "120px", height: "120px" }}
          />
          <div>
            <div className="font-medium sm:text-2xl text-md font-serif pb-2">
              {orderDetails.productTitle} - {orderDetails.totalQuantity}Kg
            </div>
            <div className="italic text-primary sm:text-sm text-xs  ">
              {orderDetails.orderID}
            </div>
          </div>
        </div>

        <div>
          <div className=" flex sm:flex-row flex-col justify-center sm:space-x-24 sm:space-y-0 space-y-4 sm:mt-13 mt-8  ">
            <div className="group basis-1/4 sm:p-6 p-3 bg-gray-200 border  shadow-md  rounded-lg    transition duration-300 ">
              <div className="mb-2 sm:text-2xl text-xl font-bold  text-primary  text-center">
                Customer Details
              </div>
              <div className=" text-gray-600  sm:space-y-3 space-y-2 p-1 ml-3 text-center ">
                <div>
                  {orderDetails.customerFName} {orderDetails.customerLName}
                </div>
                <div className="italic sm:text-sm text-xs">
                  {orderDetails.customerAddL1} <br />
                  {orderDetails.customerAddL2} <br />
                  {orderDetails.customerAddL3}
                </div>
                <div className="text-gray-600 font-semibold sm:text-md text-sm  group-hover:text-gray-800">
                  {orderDetails.customerPhoneNumber}
                </div>
              </div>
            </div>

            {type === "Courier" && (
              <div className="group basis-1/4 sm:p-6 p-3 bg-gray-200 border  shadow-md  rounded-lg    transition duration-300 ">
                <div className="mb-2 sm:text-2xl text-xl font-bold  text-primary  text-center">
                  Seller Details
                </div>
                <div className=" text-gray-600  sm:space-y-3 space-y-2 p-1 ml-3 text-center ">
                  <div>
                    {orderDetails.farmerFName} {orderDetails.farmerLName}
                  </div>
                  <div className="italic sm:text-sm text-xs">
                    {orderDetails.farmerAddL1} <br />
                    {orderDetails.farmerAddL2} <br />
                    {orderDetails.farmerAddL3}
                  </div>
                  <div className="text-gray-600 font-semibold sm:text-md text-sm group-hover:text-gray-800">
                    {orderDetails.farmerPhoneNumber}
                  </div>
                </div>
              </div>
            )}

            {type === "Farmer" && (
              <div className="group basis-1/4 sm:p-6 p-3 bg-gray-200 border  shadow-md  rounded-lg  transition duration-300">
                <div className="mb-2 sm:text-2xl text-xl font-bold  text-primary  text-center ">
                  Courier Details
                </div>
                <div className=" text-gray-600  sm:space-y-3 space-y-2 p-1 ml-3 text-center ">
                  <div>
                    {orderDetails.courierFName} {orderDetails.courierLName}
                  </div>
                  <div className="italic sm:text-sm text-xs">
                    {orderDetails.courierAddL1} <br />
                    {orderDetails.courierAddL2} <br />
                    {orderDetails.courierAddL3}
                  </div>
                  <div className="text-gray-600 font-semibold sm:text-md text-sm group-hover:text-gray-800">
                    {orderDetails.courierPhoneNumber}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderOverview;