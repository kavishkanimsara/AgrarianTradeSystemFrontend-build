import {useEffect} from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRouteBuyer = (props) => {
    const token = sessionStorage.getItem("jwtToken");
    const navigate = useNavigate();
    function presentPage(){
        navigate(-1);
    }

    if (!token) return <Navigate to="/login"/>;
    console.log(jwtDecode(token).role);
    useEffect(()=>{
        if(token && jwtDecode(token).role!=="User"){
            presentPage()
        }
    },[token && jwtDecode(token).role!=="User"])

    const decodedData = jwtDecode(token);

    if(decodedData.role === "User"){
        return <Outlet {...props}/>;
    }
    else if(decodedData.role !== "User"){
        presentPage()
    }
};

export default ProtectedRouteBuyer;