import {useEffect} from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const ProtectedRouteFarmer = (props) => {
    const token = sessionStorage.getItem("jwtToken");
    const navigate = useNavigate();
    function presentPage(){
        navigate(-1);
    }

    if (!token) return <Navigate to="/login"/>;
    console.log(jwtDecode(token).role);
    useEffect(()=>{
        if(token && jwtDecode(token).role!=="Farmer"){
            presentPage()
        }
    },[token && jwtDecode(token).role!=="Farmer"])

    const decodedData = jwtDecode(token);

    if(decodedData.role === "Farmer"){
        return <Outlet {...props}/>;
    }
    else if(decodedData.role !== "Farmer"){
        presentPage()
    }
};

export default ProtectedRouteFarmer;