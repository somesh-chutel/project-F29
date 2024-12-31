import './index.css';
import { useParams } from 'react-router-dom';

const JobsDetailedView = ()=>{

    const {id} = useParams();

    return (
        <>
        
                <h1> Jobs Detailed View</h1>

                <h1>{id}</h1>
        
        </>
    )
}


export default JobsDetailedView;