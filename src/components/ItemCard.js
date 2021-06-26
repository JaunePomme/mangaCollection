import React, { useState } from 'react'
import './ItemCard.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import firebase from 'firebase';

//add onkeyboard 'enter' do search

export default function ItemCard({ searchDataItem }) {
    const [flip, setFlip] = useState(false)
    const urlString = '/manga-profile/' + searchDataItem.mal_id
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    const { currentUser } = useAuthentication();



    async function handleLikeClick() {
        setLike(!like);
        var db = firestore.collection("liked").doc(currentUser.uid);
        const newItem = {
            mal_id: searchDataItem.mal_id,
            title: searchDataItem.title,
            image_url: searchDataItem.image_url,
            synopsis: searchDataItem.synopsis,
            volumes: searchDataItem.volumes,
            chapters: searchDataItem.chapters,
            score: searchDataItem.score

        }

        if (like) {
            return db.update({
                likes: firebase.firestore.FieldValue.arrayRemove(newItem),
            })
                .then(() => {
                    console.log("Document removed!");

                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }

        return db.update({
            likes: firebase.firestore.FieldValue.arrayUnion(newItem),
        })
            .then(() => {
                console.log("Document added!");

            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });


    }


    function handleSeeMore(searchDataItem) {
        console.log(searchDataItem)
    }



    return (
        <div className='body-itemcard'>
            {currentUser && <button className={`btn-likable ${like ? 'liked' : ''} `} onClick={handleLikeClick}>
                <FontAwesomeIcon icon={'user'}></FontAwesomeIcon>
            </button>}


            <div className={`itemcard ${flip ? 'flip' : ''} `}
                onClick={() => setFlip(!flip)}>
                <div className='front' >
                    <div>{show ? {} : null}</div>


                    <div>
                        {searchDataItem.title}
                    </div>
                    <div>
                        <img src={searchDataItem.image_url}
                            alt={searchDataItem.title}
                            style={{ maxHeight: 200 }} />
                    </div>
                    Score: {searchDataItem.score}/10

                    <div className='manga-volumes'>
                        volumes: {searchDataItem.volumes}
                    </div>
                    <div className='manga-chapters'>
                        chapters: {searchDataItem.chapters}
                    </div>
                </div>

                <div className='back' >
                    <div className='manga-synopsis'>
                        Synopsis: {searchDataItem.synopsis}
                    </div>


                    <Link to={{
                        pathname: urlString,
                        state: { data: searchDataItem, like: like }
                    }}>
                        <button className='btn-behind-itemcard' onClick={() => handleSeeMore(searchDataItem)} >
                            See more
                        </button>
                    </Link>

                    <button className='btn-behind-itemcard' >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
