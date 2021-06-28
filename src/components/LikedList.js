import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import MangaLikedCard from './MangaLikedCard';
import AnimeLikedCard from './AnimeLikedCard';
import PersonalReviews from './PersonalReviews'

export default function LikedList() {

    const { currentUser } = useAuthentication();
    const [likedMangasData, setLikedMangasData] = useState();
    const [likedAnimesData, setLikedAnimesData] = useState();
    const [reviewsData, setReviewsData] = useState();
    const [blabla, setBlabla] = useState([]);

    useEffect(() => {
        async function handleMangasRetrieve() {
            var docRef = firestore.collection("likedMangas").doc(currentUser.uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setLikedMangasData(doc.data().likes);
                    // setLikedAnimesData(doc.data().likes);
                    setReviewsData(doc.data().reviews);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        async function handleAnimesRetrieve() {
            var docRef = firestore.collection("likedAnimes").doc(currentUser.uid);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setLikedAnimesData(doc.data().likes);
                    setReviewsData(doc.data().reviews);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        handleMangasRetrieve();
        handleAnimesRetrieve();

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
            <AnimeLikedCard likedData={likedAnimesData} />


            <div className='item-grid'>
                List of Liked Mangas:
                <MangaLikedCard likedData={likedMangasData} />
            </div>

            List of reviews:
            <PersonalReviews />


        </div>
    )
}
