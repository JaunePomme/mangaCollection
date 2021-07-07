import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';



export default function Movie() {

    const [movieList, setMovieList] = useState();
    const [page, setPage] = useState(1);



    useEffect(() => {
        async function search(page) {
            try {
                let seasonalResponse = await axios.get(`https://api.jikan.moe/v3/top/anime/${page}/movie`)
                setMovieList(seasonalResponse.data.top);
                return movieList;
            }
            catch (e) {
                console.log("Error getting document:", e);
            }
        }
        search(page);
    }, [page, movieList])



    return (
        <div>
            {page > 1 && <Button
                variant="contained"
                color="secondary"
                onClick={() => setPage(page => page - 1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Previous Page
            </Button>}

            <Button
                variant="contained"
                color="secondary"
                onClick={() => setPage(page => page + 1)}>
                <FontAwesomeIcon icon={faArrowRight} />
                Next Page
            </Button>
            <List data={movieList} />
        </div>
    )
}
