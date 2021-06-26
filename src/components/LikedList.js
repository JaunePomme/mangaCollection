import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import MangaLikedCard from './MangaLikedCard';
import AnimeLikedCard from './AnimeLikedCard';
import PersonalReviews from './PersonalReviews'

export default function LikedList() {

    const { currentUser } = useAuthentication();
    const [likedData, setLikedData] = useState();
    const [reviewsData, setReviewsData] = useState();
    const [blabla, setBlabla] = useState([]);

    useEffect(() => {
        async function handleRetrieve() {
            var docRef = firestore.collection("liked").doc(currentUser.uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setLikedData(doc.data().likes);
                    setReviewsData(doc.data().reviews);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        handleRetrieve();

    }, [currentUser.uid])

//todo
    function handleSortByScore() {

        // likedData.map(item => {
        //     console.log(item.score);
        //     setBlabla(prevblabla => [...prevblabla, item.score])
        //     return blabla.sort(function (a, b) { return a - b; });
        //     // return blabla.sort();
        // })

    }




    return (
        <div>

            <button onClick={handleSortByScore}>
                Sort by score
            </button>
            {blabla}
            List of Liked Animes:
            <AnimeLikedCard likedData={likedData} />


            <div className='item-grid'>
                List of Liked Mangas:
                <MangaLikedCard likedData={likedData} />
            </div>

            List of reviews:
            <PersonalReviews />


        </div>
    )
}
