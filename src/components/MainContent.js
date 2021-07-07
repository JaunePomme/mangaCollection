import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import './MainContent.css';

export default function MainContent() {

    const [upcomingList, setUpcomingList] = useState('');
    const [topAnimeList, setTopAnimeList] = useState();
    const [topMangaList, setTopMangaList] = useState();

    useEffect(() => {
        async function search() {
            try {
                let response = await axios.get(`https://api.jikan.moe/v3/search/anime?status=upcoming&limit=5`)
                //mettre dans DB les deux
                // let resAnime = await axios.get(`https://api.jikan.moe/v3/top/anime`)
                // let resManga = await axios.get(`https://api.jikan.moe/v3/top/manga`)
                // https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&page=1
                setUpcomingList(response.data.results);
                // setTopAnimeList(resAnime.data.top);
                // setTopMangaList(resManga.data.top);
                return upcomingList;
            }
            catch (e) {
                console.log("Error getting document:", e);
            }
        }
        search();
    }, [])


    return (
        <div>
            
                <List data={upcomingList} />
                {/* <List data={topAnimeList}/>
                <List data={topMangaList}/> */}
            
        </div>
    )
}
