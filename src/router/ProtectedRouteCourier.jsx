import {useEffect} from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const ProtectedRouteCourier = (props) => {
    const token = sessionStorage.getItem("jwtToken");
    const navigate = useNavigate();
    function presentPage(){
        navigate(-1);
    }

    if (!token) return <Navigate to="/login"/>;
    console.log(jwtDecode(token).role);
    useEffect(()=>{
        if(token && jwtDecode(token).role!=="Courier"){
            presentPage()
        }
    },[token && jwtDecode(token).role!=="Courier"])

    const decodedData = jwtDecode(token);

    if(decodedData.role === "Courier"){
        return <Outlet {...props}/>;
    }
    else if(decodedData.role !== "Courier"){
        presentPage()
    }
};

export default ProtectedRouteCourier;