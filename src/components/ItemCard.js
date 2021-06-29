import React, { useEffect, useState } from 'react'
import './ItemCard.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import firebase from 'firebase';



export default function ItemCard({ searchDataItem, category }) {
    const [flip, setFlip] = useState(false)
    const urlString = '/manga-profile/' + searchDataItem.mal_id
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    const { currentUser } = useAuthentication();
    const [mangaOrNot, setMangaOrNot] = useState(true);

    useEffect(()=>{
        if(category==='anime') setMangaOrNot(false);
    },[category])

    async function handleMangaLikeClick() {
        setLike(!like);
        var db = firestore.collection("likedMangas").doc(currentUser.uid);
        const newItem = {
            mal_id: searchDataItem.mal_id,
            title: searchDataItem.title,
            image_url: searchDataItem.image_url,
            synopsis: searchDataItem.synopsis,
            volumes: searchDataItem.volumes,
            chapters: searchDataItem.chapters,
            score: searchDataItem.score,
            members: searchDataItem.members,
            start_date: searchDataItem.start_date,
            end_date: searchDataItem.end_date,

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


    async function handleAnimeLikeClick() {
        console.log('dans la fonction')
        setLike(!like);
        var db = firestore.collection("likedAnimes").doc(currentUser.uid);
        const newItem = {
            mal_id: searchDataItem.mal_id,
            title: searchDataItem.title,
            image_url: searchDataItem.image_url,
            synopsis: searchDataItem.synopsis,
            episodes: searchDataItem.episodes,
            type: searchDataItem.type,
            score: searchDataItem.score,
            rated: searchDataItem.rated,
            members: searchDataItem.members,
            start_date: searchDataItem.start_date,
            end_date: searchDataItem.end_date,

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

            {currentUser && <button className={`btn-likable ${like ? 'liked' : ''} `}
                onClick={(mangaOrNot) ? handleMangaLikeClick : handleAnimeLikeClick}>
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
