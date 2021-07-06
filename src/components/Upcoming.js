import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpcomingList from './UpcomingList';


export default function Upcoming() {

    const [upcomingList, setUpcomingList] = useState('');

    useEffect(() => {
        const search = () => {
            return axios.get(`https://api.jikan.moe/v3/search/anime?status=upcoming`)
                .then(res => {
                    setUpcomingList(res.data.results);
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                })
        }
        search();
    },[])


    return (
        <div>
            <UpcomingList upcomingList={upcomingList} />

            
        </div>
    )
}
