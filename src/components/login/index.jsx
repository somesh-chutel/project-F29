
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Login =()=> {

    const [allValues,setValues] = useState({
        username : "",
        password : "",
        errorMsg : ""
    });

    const token = Cookies.get("jwtToken");

    console.log( token );

    const navigate = useNavigate();

    const onSubmitUserData = async (e)=>{

        e.preventDefault();

        const api = "https://apis.ccbp.in/login";

        const userDetails = {
            username : allValues.username,
            password : allValues.password
        }

        const options = {
            method : "Post",
            body : JSON.stringify( userDetails )
        }

        try {

            const response = await fetch(api,options);

            const data = await response.json(); 

            if( response.ok === true ){

                setValues({...allValues,errorMsg : ""});

                Cookies.set("jwtToken",data.jwt_token);

                navigate("/");
            }
            else{

                setValues({...allValues,errorMsg : data.error_msg});

            }

            
        } catch (error) {

            console.log( error );
            
        }


    }

    useEffect(()=>{

        token !== undefined && navigate("/");


    },[]);

    return(

        <div className='login-cont'>

                <form onSubmit={onSubmitUserData} style={{width:"35%"}} className='border border-primary p-3 rounded'>
                <div className="form-group">
                    <label className='text-danger' htmlFor="exampleInputEmail1">Username</label>
                    <input  onChange={(e)=>{setValues({...allValues,username : e.target.value})}} type="text" className="form-control text-danger" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                </div>
                <div className="form-group">
                    <label className='text-danger' htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(e)=>{setValues({...allValues,password : e.target.value})}} type="password" className="form-control text-danger" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <br /> 
                <p className='text-danger'>{allValues.errorMsg}</p>
                </form>

        </div>

    )
}




export default Login