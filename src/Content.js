import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import './App.css'
import axios from 'axios';
import Menu from './components/Menu';
import MainContent from './components/MainContent';
import { firestore } from './firebase';
import { useAuthentication } from './contexts/AuthenticationContext';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3),
    },
}));

export default function Content() {
    const CATEGORY_LIST = ['manga', 'anime'];
    const [category, setCategory] = useState(CATEGORY_LIST[0])
    const { currentUser } = useAuthentication();
    // const GENRE_LIST=[1,2,3,4,5,6,7,8,9]
    const [inputValue, setInputValue] = useState('')
    // const [genre, setGenre]=useState(GENRE_LIST[0]);
    const [likedMangasRetrieved, setLikedMangasRetrieved] = useState();
    const [likedAnimesRetrieved, setLikedAnimesRetrieved] = useState();
    const classes = useStyles();
    const [searchData, setSearchData] = useState([]);
    const [page, setPage] = useState(1);

    

    async function searchItem(category, keyword) {
        try {
            let response = await axios.get(`https://api.jikan.moe/v3/search/${category}?q=${keyword}`);
            setSearchData(response.data.results);
            return searchData;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        async function handleRetrieveLikedMangaList() {
            firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
                .get()
                .then((querySnapshot) => {
                    const newMangaList = []
                    querySnapshot.forEach((doc) => {
                        newMangaList.push(doc.data().title)
                    });
                    setLikedMangasRetrieved(newMangaList)
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        async function handleRetrieveLikedAnimeList() {
            firestore.collection("likedAnimes").doc(currentUser.uid).collection('anime')
                .get()
                .then((querySnapshot) => {
                    const newAnimeList = []
                    querySnapshot.forEach((doc) => {
                        newAnimeList.push(doc.data().title)
                    });
                    setLikedAnimesRetrieved(newAnimeList)
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

        handleRetrieveLikedMangaList();
        handleRetrieveLikedAnimeList();
    }, [])





    return (
        <div>

            <div className='container-data'>
                <div className='search-bar'>
                    <input type='text'
                        onChange={e => setInputValue(e.target.value)}
                        placeholder='search...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchItem(category, inputValue, page)
                            }
                        }} />

                    <form className='form'>
                        <div>
                            <label htmlFor='category'>Category</label>
                            <select id='category'
                                onChange={e => setCategory(e.target.value)}>
                                {CATEGORY_LIST.map(category =>
                                    <option key={category}>
                                        {category}
                                    </option>)}
                            </select>

                        </div>
                    </form>



                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            searchItem(category, inputValue);
                        }}
                        className={classes.button}>
                        <FontAwesomeIcon icon={faSearch} />
                        Search
                    </Button>

                </div>
                {/* <div>
                    {page > 1 && <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setPage(page=>page - 1);
                            console.log(page)
                            searchItem(category, inputValue, page);
                        }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Previous Page
                    </Button>
                    }

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            console.log(page)
                            setPage(page=>page+1);
                            console.log(page)
                            searchItem(category, inputValue, page);
                        }}>
                        <FontAwesomeIcon icon={faArrowRight} />
                        Next Page
                    </Button>
                </div> */}
                <ItemList
                    searchData={searchData}
                    category={category}
                    likedMangasRetrieved={likedMangasRetrieved}
                    likedAnimesRetrieved={likedAnimesRetrieved} />
                <div className='footer'>
                    Pagination
                </div>
            </div>

            <Menu />
            <MainContent />
        </div>
    )
}
