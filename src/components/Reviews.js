import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Reviews(){

    let {slug}=useParams();
    return(
        <div>
            component : reviews
            <p>Welcome to reviews class dear {slug} !</p>

            <FontAwesomeIcon icon={'user'}></FontAwesomeIcon>
       
        <Link to={{
            pathname:'/users',
            state:{
                nomDeTruc:slug,
            }
        }}>
        Clique pour test la location avec du state
    
        </Link>
        </div>
    )
}