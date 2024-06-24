import { React, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
import { getAllBuyerOrders } from "@/services/orderServices";
import { jwtDecode } from "jwt-decode";

export default function BuyerTabAndTables({ defaultTab }) {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(defaultTab);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (location.pathname === "/my-orders") {
      setTab(defaultTab);
    }
  }, [location.pathname, defaultTab]);

  useEffect(() => {
    const fetchBuyerOrders = async () => {
      try {
        const details = await getAllBuyerOrders(buyerID);
        setData(details);
      } catch (error) {
        console.error("Error while fetching buyer orders:", error);
      }
    };
    fetchBuyerOrders();
  }, [buyerID]);

  useEffect(() => {
    const filterResult = (statusItem) => {
      let result = [];
      if (statusItem === "All") {
        result = data.filter(
          (item) =>
            item.orderStatus.toLowerCase() === "ready to pickup" ||
            item.orderStatus.toLowerCase() === "picked up" ||
            item.orderStatus.toLowerCase() === "review" ||
            item.orderStatus.toLowerCase() === "return" ||
            item.orderStatus.toLowerCase() === "new" 
        );
      } else if (statusItem === "Delivered") {
        result = data.filter(
          (item) =>
            item.orderStatus.toLowerCase() === "review" ||
            item.orderStatus.toLowerCase() === "return"
        );
      } else {
        result = data.filter(
          (item) => item.orderStatus.toLowerCase() === statusItem.toLowerCase()
        );
      }
      setFilteredData(result);
    };
    filterResult(tab);
  }, [data, tab]);

  const handleRowClick = (id) => {
    navigate(`/buyers/my-orders/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex sm:justify-end justify-center sm:mr-16 mr-0 text-custom-gray  font-medium">
        <div className="flex sm:text-sm text-xs border-b-2 ">
          <button
            onClick={() => setTab("All")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out  ${
              tab === "All"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            All
          </button>

          <button
            onClick={() => setTab("Ready to pickup")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out  ${
              tab === "Ready to pickup"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            Ready to pickup
          </button>

          <button
            onClick={() => setTab("Picked up")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out ${
              tab === "Picked up"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray"
            }`}
          >
            Picked up
          </button>

          <button
            onClick={() => setTab("Delivered")}
            className={`focus:outline-none  sm:w-40 w-24 transition duration-300 ease-in-out ${
              tab === "Delivered"
                ? "text-primary border-b-2 border-primary "
                : "text-custom_gray "
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      <div>
        <div className=" flex-col justify-center text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr class="border-b border-primary">
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Product
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Order reference
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Order Placed
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Delivery Date
                </th>
                <th className=" py-5 font-bold w-24 text-center align-middle">
                  Quantity (Kg)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((values) => {
                const {
                  orderID,
                  productTitle,
                  orderedDate,
                  totalQuantity,
                  productImageUrl,
                  deliveryDate,
                  orderStatus,
                } = values; //destructuring
                return (
                  <tr
                    key={orderID}
                    onClick={() => handleRowClick(orderID)}
                    onMouseEnter={() => setSelectedRow(orderID)}
                    onMouseLeave={() => setSelectedRow(null)}
                    className={
                      selectedRow === orderID
                        ? "bg-gray-200 cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <td class="p-3 w-24 text-center align-middle">
                      <div className="flex space-x-5 ">
                        <Avatar
                          src={
                            "https://syntecblobstorage.blob.core.windows.net/products/" +
                            productImageUrl
                          }
                          size="sm"
                        />
                        <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                          {productTitle}
                        </p>
                      </div>
                    </td>

                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {orderID}
                      </p>
                    </td>

                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {formatDate(orderedDate)}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {formatDate(deliveryDate)}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900 pt-1">
                        {totalQuantity}Kg
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      {orderStatus.toLowerCase() === "ready to pickup" && (
                        <p className=" bg-red-200 rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Ready to Pickup
                        </p>
                      )}
                      {(orderStatus.toLowerCase() === "new" ||
                        orderStatus.toLowerCase() === "pending") && (
                        <p className=" bg-yellow-400 rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          New Order
                        </p>
                      )}
                      {orderStatus.toLowerCase() === "picked up" && (
                        <p className=" bg-indigo-200 rounded-lg block font-sans text-sm antialiased  leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Picked up
                        </p>
                      )}
                      {(orderStatus.toLowerCase() === "review" ||
                        orderStatus.toLowerCase() === "return") && (
                        <p className=" bg-primary rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                          Delivered
                        </p>
                      )}
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="sm:hidden">
          {filteredData.map((values) => {
            const {
              orderId,
              product,
              orderedDate,
              deliveryDate,
              totalQuantity,
              photoName,
              status,
            } = values; //destructuring
            return (
              <>
                <div className="group bg-gray-200 border hover:border hover:border-primary hover:bg-green-50 transition duration-300 ease-out  p-4  rounded-lg shadow mt-8  ">
                  <Link to={`/buyers/my-orders/${orderId}`}>
                    <div className="grid grid-cols-2 gap-x-10 mt-2">
                      <div>
                        <img
                          src={photoName}
                          alt={product}
                          className="w-24 h-14 pl-8"
                        />
                        <div className="pl-5 mt-8">
                          <div className="text-md pb-2 font-medium text-gray-700 ">
                            {product} - {totalQuantity}Kg
                          </div>
                          <div className="text-sm italic text-gray-400">
                            {orderId}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600  p-2  group-hover:text-custom_gray flex flex-col space-y-5">
                          <div>
                            <div className="text-sm "> Ordered Date:</div>
                            <div className="text-md font-semibold">
                              {" "}
                              {orderedDate}
                            </div>
                          </div>
                          <div>
                            {status === "Ready to pickup" && (
                              <p class=" bg-red-200 rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                {status}
                              </p>
                            )}
                            {status === "Picked up" && (
                              <p class=" bg-indigo-200 rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                {status}
                              </p>
                            )}
                            {(status === "review" || status === "return") && (
                              <p class=" bg-primary rounded-lg block font-sans text-sm antialiased leading-normal text-blue-gray-900 pt-1 h-8 w-28 font-medium text-center">
                                {status}
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="text-sm "> Delivery Date:</div>
                            <div className="text-md font-semibold">
                              {" "}
                              {deliveryDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
