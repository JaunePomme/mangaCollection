import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpcomingList from './UpcomingList';
import './Upcoming.css'

export default function Upcoming() {

    const [upcomingList, setUpcomingList] = useState('');

    useEffect(() => {
        async function search() {
            try {
                let response = await axios.get(`https://api.jikan.moe/v3/search/anime?status=upcoming`)
                setUpcomingList(response.data.results);
                return upcomingList;
            }
            catch (e) {
                console.log("Error getting document:", e);
            }
        }
        search();
    }, [])


    return (
        <div className='upcominglist-container'>
            <div className='upcominglist-grid'>
                <UpcomingList upcomingList={upcomingList} />
            </div>
        </div>
    )
}
