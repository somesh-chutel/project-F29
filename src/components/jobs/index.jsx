import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Jobs =()=> {

    const navigate = useNavigate();

    const token = Cookies.get("jwtToken");  

    useEffect( ()=>{

        if( token === undefined ){

            navigate("/login");
        }


    },[] );
    return (
        <>

            <h1> Jobs Component </h1>
        
        </>
    )
}




export default Jobs;