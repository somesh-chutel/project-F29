import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../header';
import FilterSection from '../filterSection';
import DisplayAllJobs from '../displayAllJobs';
import './index.css';

const Jobs =()=> {

    const [allValues,setValues] = useState({
        jobsList : []
    });

    const token = Cookies.get("jwtToken");

    useEffect( ()=>{

            const fetchAllJobs = async()=>{

                const api = "https://apis.ccbp.in/jobs";

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

    },[] );

    return (
        <div className='jobs-main-cont'>

            <Header/>

            <div className='filter-alljobs-cont'>

                    <div className='filter-cont'>
                        <FilterSection/>
                    </div>

                    <ul className='alljobs-cont'>

                        {
                            allValues.jobsList.map( each => <DisplayAllJobs key = {each.id} jobsItem = {each}/> )
                        }
                       
                    </ul>

            </div>
        
        </div>
    )
}




export default Jobs;