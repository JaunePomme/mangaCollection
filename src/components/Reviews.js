import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import MemberReviewList from './MemberReviewList';


export default function Reviews() {


    const [reviewList, setReviewList] = useState('');
    let { title } = useParams();
    let location = useLocation();
    const type=location.state.type;
    const id=location.state.id;

    useEffect(() => {
        const search = (type) => {
            return axios.get(`https://api.jikan.moe/v3/${type}/${id}/reviews`)
                .then(res => {
                    setReviewList(res.data.reviews);
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                })
        }
        search(type,id);
    },[id, type])




    return (
        <div>
            <FontAwesomeIcon icon={'user'}></FontAwesomeIcon>
            <p>Welcome to reviews class dear {title} !</p>


            <MemberReviewList reviewList={reviewList} />

        </div>
    )
}