import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute =(prop)=> {

    const {Component} = prop;

    const navigate = useNavigate();

    const token = Cookies.get("jwtToken");  

    useEffect( ()=>{

        if( token === undefined ){

            navigate("/login");
        }


    },[] );
    return <Component/>
}




export default ProtectedRoute;