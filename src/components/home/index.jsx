import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Home =()=> {

    const navigate = useNavigate();

    const token = Cookies.get("jwtToken");  

    useEffect( ()=>{

        if( token === undefined ){

            navigate("/login");
        }


    },[] );
    return (
        <>

            <h1> Home Component </h1>
        
        </>
    )
}




export default Home;