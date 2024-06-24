import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LandingPage from "./user/LandingPage";
import BuyerDashboard from "./buyer/layout/BuyerDashboard";
import CourierDashboard from "./courier/layout/CourierDashboard";
import ProductList from "./user/pages/ProductList";
import Login from "./user/auth/Login";
import CreateAccount from "./user/auth/CreateAccount";
import FarmerCreateAccount from "./user/auth/FarmerCreateAccount";
import CourierCreateAccount from "./user/auth/CourierCreateAccount";
import ProtectedRouteCourier from "./router/ProtectedRouteCourier";
import ProtectedRouteFarmer from "./router/ProtectedRouteFarmer";
import ForgotPassword from "./user/auth/ForgotPassword";
import ProductDetails from "./user/pages/ProductDetails";
import PageNotFound from "./user/pages/PageNotFound";
import ShoppingCart from "./user/pages/ShoppingCart";
import EmailVerify from "./user/auth/EmailVerify";
import ProtectedRouteBuyer from "./router/ProtectedRouteBuyer";

function App() {
  
  // const routes = {
  //   admin: [
  //     {
  //       path: "/dashboard",
  //       component: AdminDashboard,
  //       // Other admin routes...
  //     },
  //   ],
  //   farmer: [
  //     {
  //       path: "/dashboard",
  //       component: FarmerDashboard,
  //       // Other farmer routes...
  //     },
  //   ],
  //   // Define routes for other roles...
  // };
  
  return (
    <>
     <Routes>    
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/create" element={<CreateAccount/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/farmercreate" element={<FarmerCreateAccount/>}/>
      <Route path="/couriercreate" element={<CourierCreateAccount/>}/>
      <Route path='/product-details/:id' element={<ProductDetails/>}></Route>
      <Route element={<ProtectedRouteBuyer/>}>
        <Route path="/cart" element={<ShoppingCart/>}/>
      </Route>
      <Route path="/verify-email" element={<EmailVerify/>} />
      <Route element={<ProtectedRouteCourier/>}>
        <Route exact path="/couriers/*" element={<CourierDashboard/>}/>
      </Route>
      <Route element={<ProtectedRouteBuyer/>}>
        <Route path="/buyers/*" element={<BuyerDashboard/>}/>
      </Route>
      <Route element={<ProtectedRouteFarmer/>}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
