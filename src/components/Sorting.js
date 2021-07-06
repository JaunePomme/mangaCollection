import React, { useState, useEffect } from 'react'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';


export default function Sorting({ likedMangasData, likedAnimesData ,setLikedAnimesData, setLikedMangasData }) {


    const {currentUser}=useAuthentication();

 
    function handleSortByScoreDesc(){
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
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
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
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


    function handleSortByPersonalScore(){
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        // .where("score", "==", 15)
        .orderBy('personalScore')
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
        .orderBy('personalScore')
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

    function handleSortByPersonalScoreDesc(){
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        .orderBy('personalScore','desc')
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
        .orderBy('personalScore', 'desc')
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

    function handleSort(){
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        .orderBy('title')
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
        .orderBy('title')
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

    function handleReverseSort(){
        firestore.collection("likedMangas").doc(currentUser.uid).collection('manga')
        .orderBy('title','desc')
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
        .orderBy('title', 'desc')
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
                Sort by highest score according to MyAnimList
            </button>
            <button type='button' onClick={handleSortByScore}>
                Sort by lowest score according to MyAnimList
            </button>
            <button type='button' onClick={handleSortByPersonalScoreDesc}>
                Sort by highest personal score
            </button>
            <button type='button' onClick={handleSortByPersonalScore}>
                Sort by lowest personal score
            </button>
            <button type='button' onClick={handleSort}>
                Sort by alphabetical order
            </button>
            <button type='button' onClick={handleReverseSort}>
                Sort by reverse alphabetical order
            </button>


        </div>
    )
}
