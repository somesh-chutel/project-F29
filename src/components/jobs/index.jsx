import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../header';
import FilterSection from '../filterSection';
import DisplayAllJobs from '../displayAllJobs';
import './index.css';

const Jobs =()=> {

    const [allValues,setValues] = useState({
        jobsList : [],
        empType : [],
        minPakage : "",
        userInput : ""
    });

    const token = Cookies.get("jwtToken");

    useEffect( ()=>{

            const fetchAllJobs = async()=>{

                const {userInput,empType,minPakage} = allValues;

                console.log( empType );

                const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPakage}&search=${userInput}`;

                const options = {
                    method : "Get",
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }


                try {

                    const response = await fetch(api,options);

                    const data = await response.json();


                    if( response.ok === true ){

                        setValues({...allValues,jobsList : data.jobs });

                    }

                    
                } catch (error) {
                    console.log( error );
                }

            }


            fetchAllJobs();

    },[allValues.userInput,allValues.empType] );


    const onSearchUserIn = (e)=>{

        if( e.key === "Enter" ){

            setValues({...allValues,userInput : e.target.value}); 

        }

    }

    const empTypeChange = (value,isChecked)=>{

        if( isChecked ){

            setValues({...allValues,empType : [...allValues.empType,value]});//[FULLTIME,PARTIME]

        }
        else{

            setValues({...allValues,empType : allValues.empType.filter(each=> each !== value)});

        }

    }

    return (
        <div className='jobs-main-cont'>

            <Header/>

            <div className='filter-alljobs-cont'>

                    <div className='filter-cont'>
                        <FilterSection empFunc = {empTypeChange}/>
                    </div>
                    <div style={{width : "60%"}}>

                        <input onKeyUp={onSearchUserIn} type="search" className='form-control w-75 text-dark mt-3 ml-3'/>

                    <ul className='alljobs-cont'>

                        {
                            allValues.jobsList.map( each => <DisplayAllJobs key = {each.id} jobsItem = {each}/> )
                        }
                       
                    </ul>
                    </div>

            </div>
        
        </div>
    )
}




export default Jobs;