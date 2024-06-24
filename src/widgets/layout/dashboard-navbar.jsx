import { useLocation, Link } from "react-router-dom";
import logout from "@/user/auth/Logout.js";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { SiGooglemessages } from "react-icons/si";
import axios from "axios";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useState, useEffect } from "react";
import { updateOrderStatus } from "@/services/orderServices";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [confirm, setConfirm] = useState(false);
  const [selected, setSelected] = useState(false);
  const [to , setTo] = useState("");

  const [notificationList, setNotificationList] = useState([]);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    try{
      const token = sessionStorage.getItem('jwtToken');
      const decodedData = jwtDecode(token);
      setTo(decodedData.email);
      console.log(decodedData.email)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [to]);
  useEffect(() => {
    axios
      .get(`https://localhost:7144/api/Notification/to/` + to)
      .then((response) => {
        setNotificationList(response.data);
        //setConfirm(response.data.isSeen);
        setNotificationCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [to]);

  const deleteNotification = (id) => {
    axios
      .delete(`https://localhost:7144/api/Notification/${id}`)
      .then((response) => {
        console.log("Notification deleted:", response.data);
        setNotificationList(
          notificationList.filter((notification) => notification.id !== id)
        );
        setNotificationCount(notificationCount - 1);
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  const handleUpdateStatus = async (orderID, newStatus, notifyId) => {
    try {
      const response = await updateOrderStatus(orderID, newStatus);
      console.log("Order status updated successfully:", response);
      deleteNotification(notifyId);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePopup = (notification) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes",
      canclelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelected(true);
        // Handle updating tracking status
        handleUpdateStatus(
          notification.orderID,
          notification.orderStatus === "ready to pickup"
            ? "picked up"
            : "review",
          notification.id
        );
      }
    });
  };

  const handlePopup2 = (notification) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes",
      canclelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelected(true);
        deleteNotification(notification.id);
      }
    });
  };

  const handlePopup3 = (notification) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to return the order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes",
      canclelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelected(true);
        handleUpdateStatus(notification.orderID, "return", notification.id);
      }
    });
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <div className="flex justify-end">
            <Button
              variant="text"
              color="red"
              className="flex gap-2 items-center normal-case px-3"
              onClick={logout}
            >
              <UserCircleIcon className="h-5 w-5 text-red-500" />
              Sign Out
            </Button>
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <div className="relative">
                    <BellIcon
                      fontSize={45}
                      className="h-6 w-6  text-blue-gray-500"
                    />
                    {notificationCount > 0 && (
                      <span className="absolute p-1 top-0 right-0 inline-flex items-center justify-center h-3 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </div>
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0">
                {notificationList.map((notification) =>
                  notification.isSeen ? (
                    <MenuItem
                      key={notification.id}
                      className="flex items-start gap-2 p-2 bg-white"
                    >
                      <SiGooglemessages className="text-4xl  mt-2" />
                      <div className="flex-grow">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mt-1 font-normal"
                        ></Typography>
                        <Typography
                          color="green"
                          className="text-sm font-medium"
                        >
                          <strong>{notification.message}</strong>
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex flex-col gap-1 text-xs font-normal mt-2"
                        >
                          <div className="flex space-x-4 mt-2">
                            <button
                              className="bg-primary text-white px-4 py-2 rounded hover:bg-green-900 transition-colors"
                              onClick={() => handlePopup(notification)}
                            >
                              Confirm
                            </button>
                            {notification.orderStatus === "ready to pickup" ? (
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
                                onClick={() => handlePopup2(notification)}
                              >
                                Cancel
                              </button>
                            ) : (
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
                                onClick={() => handlePopup3(notification)}
                              >
                                Return
                              </button>
                            )}
                          </div>
                          <div className="w-full border-b border-gray-300 my-2"></div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4 text-gray-500" />
                            {new Date(notification.sendAt).toLocaleTimeString()}
                          </div>
                        </Typography>
                      </div>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={notification.id}
                      className="flex items-center gap-3"
                    >
                      <SiGooglemessages className="text-3xl -mt-6" />{" "}
                      {/* Increase size and adjust top margin */}
                      <div className="flex-grow">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mt-1 font-normal"
                        >
                          <strong>{notification.from}</strong>
                        </Typography>
                        <Typography
                          color="green"
                          className="flex items-center gap-1 text-xs font-normal"
                        >
                          <strong>{notification.message}</strong>
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" />{" "}
                          {new Date(notification.sendAt).toLocaleTimeString()}
                        </Typography>
                      </div>
                      <RiDeleteBack2Fill
                        className="ml-6 text-2xl cursor-pointer" // Increase left margin and size
                        onClick={() => deleteNotification(notification.id)}
                      />
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
