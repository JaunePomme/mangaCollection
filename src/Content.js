import React, { useState } from 'react';
import ItemList from './components/ItemList';
import './App.css'
import axios from 'axios';
import Menu from './components/Menu';
import Upcoming from './components/Upcoming';

export default function Content() {
    const CATEGORY_LIST = ['manga', 'anime'];
    const [numberOfResults, setNumberOfResults] = useState(30)
    const [inputValue, setInputValue] = useState('')
    const [category, setCategory] = useState(CATEGORY_LIST[0])

    const [searchData, setSearchData] = useState([]);

    // const search = (category, keyword, numberOfResults) => {
    //     return axios.get(`https://api.jikan.moe/v3/search/${category}?q=${keyword}&limit=${numberOfResults}`)
    //       .then(res => setSearchData(res.data.results))
    //     }


    async function searchItem(category, keyword, numberOfResults) {
        try {
            let response = await axios.get(`https://api.jikan.moe/v3/search/${category}?q=${keyword}&limit=${numberOfResults}`);
            //   let response= await axios.get('https://api.jikan.moe/v3/search/manga?q=naruto&limit=3')
            //   if (!response.ok) throw new Error(`Error HTTP status: ${response.status}`)
            setSearchData(response.data.results);

            return searchData;
        } catch (e) {
            console.log(e);
        }
    }



    return (
        <div>

            <div className='container-data'>
                <div className='search-bar'>
                    <input type='text' 
                    onChange={e => setInputValue(e.target.value)} 
                    placeholder='search...'
                    onKeyDown={(e)=>{if(e.key==='Enter'){
                    searchItem(category, inputValue, numberOfResults) 
                    }}} />

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

                    <div className='numberOfResults'>
                        <label htmlFor='numberOfResults'>Number of results</label>
                        <input
                            type='number'
                            min='1'
                            max='50'
                            step='1'
                            defaultValue={numberOfResults}
                            onChange={(e) => setNumberOfResults(e.target.value)} />
                    </div>

                    <button className='search-button' 
                    onClick={() =>
                        searchItem(category, inputValue, numberOfResults)
                    }
                    
                    >Search</button>

                </div>

                <ItemList searchData={searchData} category={category} />
                <div className='footer'>
                    Pagination
                </div>
            </div>

                <Menu/>
                <Upcoming/>
        </div>
    )
}
