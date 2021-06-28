import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnimeLikedCard({ likedData }) {
    const [flip, setFlip] = useState(false)
    const [show, setShow] = useState(false);


    function handleSeeMore(searchDataItem) {
        console.log(searchDataItem)
    }

    return (
        <div>
            <div>

                {likedData && likedData.map(item =>
                    <div key={item.mal_id}>
                        <div className='body-mangacard'>

                            <div className={`mangacard ${flip ? 'flip' : ''} `}
                                onClick={() => setFlip(!flip)}>
                                <div className='front' >
                                    <div>{show ? {} : null}</div>


                                    <div>
                                        {item.title}
                                    </div>
                                    <div>
                                        <img src={item.image_url}
                                            alt={item.title}
                                            style={{ maxHeight: 200 }} />
                                    </div>
                                    Score: {item.score}/10

                                    <div className='manga-volumes'>
                                        episodes: {item.episodes}
                                    </div>
                                    <div className='manga-chapters'>
                                        rating: {item.rating}
                                    </div>
                                </div>

                                <div className='back' >
                                    <div className='manga-synopsis'>
                                        Synopsis: {item.synopsis}
                                    </div>


                                    <Link to={{
                                        pathname: '/manga-profile/' + item.mal_id,
                                        state: { data: item, like: true }
                                    }}>
                                        <button className='btn-behind-mangacard' onClick={() => handleSeeMore(item)} >
                                            See more
                                        </button>
                                    </Link>

                                    <button className='btn-behind-mangacard' >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    )
}
