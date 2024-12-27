
import { useState } from 'react';
import './index.css';

const Login =()=> {

    const [allValues,setValues] = useState({
        username : "",
        password : "",
        errorMsg : ""
    });

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

                console.log( data );
            }
            else{

                setValues({...allValues,errorMsg : data.error_msg});

            }

            
        } catch (error) {

            console.log( error );
            
        }


    }



    return(

        <div className='login-cont'>

                <form onSubmit={onSubmitUserData} style={{width:"35%"}} className='border border-primary p-3 rounded'>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input onChange={(e)=>{setValues({...allValues,username : e.target.value})}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(e)=>{setValues({...allValues,password : e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <br /> 
                <p className='text-danger'>{allValues.errorMsg}</p>
                </form>

        </div>

    )
}




export default Login