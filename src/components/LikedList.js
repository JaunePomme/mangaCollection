import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import MangaLikedList from './MangaLikedList';
import AnimeLikedList from './AnimeLikedList';
import Sorting from './Sorting';
export default function LikedList() {

    const { currentUser } = useAuthentication();
    const [likedMangasData, setLikedMangasData] = useState([]);
    const [likedAnimesData, setLikedAnimesData] = useState([]);


    useEffect(() => {

        function handleAnimesRetrieve() {
            firestore.collection("likedAnimes").doc(currentUser.uid).collection('anime')
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

        function handleMangasRetrieve() {
            firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
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
        }

        handleMangasRetrieve();
        handleAnimesRetrieve();
        
    }, [currentUser.uid])


 
    
    return (
        <div>

            <Sorting 
            likedMangasData={likedMangasData} 
            likedAnimesData={likedAnimesData} 
            setLikedMangasData={setLikedMangasData} 
            setLikedAnimesData={setLikedAnimesData} />

            List of Liked Animes:
            <AnimeLikedList likedData={likedAnimesData} />


            <div className='item-grid'>
                List of Liked Mangas:
                <MangaLikedList likedData={likedMangasData}  />
            </div>


        </div>
    )
}
