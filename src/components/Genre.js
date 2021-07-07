import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import List from './List';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Seasonal.css';
import { mangaGenre, animeGenre } from './const.js'



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(3),
    },

}));

export default function Genre() {

    const [seasonalList, setSeasonalList] = useState();
    const SEASON_LIST = ['fall', 'summer', 'winter', 'spring'];
    const [inputYear, setInputYear] = useState(2021);
    const [inputSeason, setInputSeason] = useState(SEASON_LIST[0])
    const classes = useStyles();
    const [mangaListGenre, setMangaListGenre] = useState([]);
    const [animeListGenre, setAnimeListGenre] = useState([]);
    const CATEGORY_LIST = ['manga', 'anime'];
    const [category, setCategory] = useState(CATEGORY_LIST[0])
    const [genre, setGenre] = useState(1);
    const [dataList, setDataList] = useState()


    useEffect(() => {
        setMangaListGenre(mangaGenre);
        setAnimeListGenre(animeGenre);

    }, []);

    //https://api.jikan.moe/v3/search/anime?genre=4
    async function search(category, genre) {
        try {
            let response = await axios.get(`https://api.jikan.moe/v3/search/${category}?genre=${genre}`)
            setDataList(response.data.results);
            return dataList;
        }
        catch (e) {
            console.log("Error getting document:", e);
        }
    }



    useEffect(() => {
        search(category, genre)
    }, [])

    function handle() {
        
        console.log(category)
        console.log(genre)
        
    }

    return (
        <div>
            <div className='seasonal-container'>
            <FormControl className={classes.formControl}>
                <InputLabel shrink >
                    Anime/Manga
                </InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={classes.selectEmpty}>
                    <MenuItem value={'anime'}>Anime</MenuItem>
                    <MenuItem value={'manga'}>Manga</MenuItem>
                </Select>
                <FormHelperText>Choose between Anime and Manga</FormHelperText>
            </FormControl>

            {(category==='manga')? <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        select
                        label="Select"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        helperText="Select manga genre">

                        {mangaListGenre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                :
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        select
                        label="Select"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        helperText="Select anime genre">

                        {animeListGenre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                }


                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        search(category, genre)
                    }}
                    className={classes.button}>
                    <FontAwesomeIcon icon={faSearch} />
                    Search
                </Button>

            </div>


            <button onClick={handle}>
                là
            </button>
            <List data={dataList}/>
        </div>
    )
}
