import React, { useState, useEffect } from 'react'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';


export default function Sorting({ likedMangasData, likedAnimesData ,setLikedAnimesData, setLikedMangasData }) {
    const [notSortedMangaList, setNotSortedMangaList] = useState([]);
    const [notSortedAnimeList, setNotSortedAnimeList] = useState([]);


    const {currentUser}=useAuthentication();

 
    function handleSortByScoreDesc(){
        console.log('hi')
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        // .where("score", "==", 15)
        .orderBy('score', 'desc')
        .get()
        .then((querySnapshot) => {
            const newMangaList = []
            querySnapshot.forEach((doc) => {
                newMangaList.push(doc.data())
            });
            setLikedMangasData(newMangaList)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        firestore.collection("likedAnimes").doc(currentUser.uid).collection('anime')
        // .where("score", "==", 15)
        .orderBy('score', 'desc')
        .get()
        .then((querySnapshot) => {
            const newAnimeList = []
            querySnapshot.forEach((doc) => {
                newAnimeList.push(doc.data())
            });
            setLikedAnimesData(newAnimeList)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    function handleSortByScore(){
        console.log('hi')
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        // .where("score", "==", 15)
        .orderBy('score')
        .get()
        .then((querySnapshot) => {
            const newMangaList = []
            querySnapshot.forEach((doc) => {
                newMangaList.push(doc.data())
            });
            setLikedMangasData(newMangaList)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        firestore.collection("likedAnimes").doc(currentUser.uid).collection('anime')
        // .where("score", "==", 15)
        .orderBy('score')
        .get()
        .then((querySnapshot) => {
            const newAnimeList = []
            querySnapshot.forEach((doc) => {
                newAnimeList.push(doc.data())
            });
            setLikedAnimesData(newAnimeList)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    return (
        <div>
            <button type='button' onClick={handleSortByScoreDesc}>
                Sort by highest MyAnimList Score
            </button>
            <button type='button' onClick={handleSortByScore}>
                Sort by lowest MyAnimList Score
            </button>


        </div>
    )
}
