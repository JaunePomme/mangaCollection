import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import firebase from 'firebase';
import { firestore } from '../firebase';
import { useAuthentication } from '../contexts/AuthenticationContext';

export default function Remember() {
    const initialState = [];
    const [user, setUser] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [mangaList, setMangaList] = useState(initialState);
    const [manga, setManga] = useState('')
    const { currentUser } = useAuthentication();


    function handleChange(e) {
        setUser(e.target.value)
    }

    function handleChangeManga(e) {
        setManga(e.target.value)
    }

    function handleRememberMe() {
        setRememberMe(!rememberMe)
    }
//
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        setRememberMe(JSON.parse(localStorage.getItem('rememberMe')))
        setMangaList(JSON.parse(localStorage.getItem('mangalist', mangaList)))
    }, [mangaList])

    function handleFormSubmit() {
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
        localStorage.setItem('user', rememberMe ? JSON.stringify(user) : '');
    }

    function addMangaList(e) {
        e.preventDefault();
        setManga(manga);
        setMangaList([...mangaList, manga]);
        setManga('');
    }


    function handleMangaSubmit() {
        localStorage.setItem('mangalist', JSON.stringify(mangaList))
    }

    function handleFirestore() {
        database.liked.add({
            kamel: 'malki',
            name: 'hi'
        });
    }

    const [data, setData] = useState([])

    useEffect(() => {
        const db = firebase.firestore()
        const retrieve = async () => {
            const data = await db.collection('liked').get()
            setData(data.docs.map(doc => doc.data()))
        }
        retrieve();

    }, [])



    async function handleDb() {
        var db = firestore.collection("liked").doc(currentUser.uid);
        // var newItem = {
        //     mal_id: 1118,
        //     notation: 8
        // }
        const newItem = {
            mal_id: 111,
            score: 4
        }
        return db.update({

            nouveau: firebase.firestore.FieldValue.arrayUnion(newItem),

        })
            .then(() => {
                console.log("Document updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });

    }


    return (
        <div>
            <form onSubmit={() => handleFormSubmit()}>
                <label>
                    User: <input name="user" value={user} onChange={(e) => handleChange(e)} />
                </label>
                <label>
                    <input name="rememberMe" onChange={() => handleRememberMe()} type="checkbox" checked={rememberMe} /> Remember me
                </label>


                <button type="submit">Sign In</button>

            </form>


            <form onSubmit={() => handleMangaSubmit()}>
                <input name='manga' value={manga} onChange={(e) => handleChangeManga(e)} />

                <button onClick={(e) => addMangaList(e)} > AddManga</button>

                <button type='submit'> AddManga dans storage</button>
            </form>

            {mangaList}

            <button onClick={() => handleFirestore()} >
                add firestore
            </button>


            <div>
                <button onClick={handleDb}>
                    Click to update DB
                </button>
            </div>

            <div>

                {JSON.stringify(data)}
                {data.map(dat => {
                    return (<li key={dat}>
                        {dat.email}
                        {dat.userId}
                    </li>)
                })}

            </div>

            {/* {data} */}

        </div>
    )
}
