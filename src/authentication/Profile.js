import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { Link } from 'react-router-dom';
import LikedList from '../components/LikedList';
import { firestore } from '../firebase';

export default function Profile() {

    let history = useHistory();
    const { currentUser, logout } = useAuthentication();
    const [pseudo, setPseudo] = useState('');


//a checker
    async function handleLogout() {
        try {
            await logout();
            history.push('/login')
        } catch(error) {
            console.log(error)
            alert(error)
        }

    }





    useEffect(() => {
        setPseudo(localStorage.getItem('pseudo'))
    }, [])

    return (
        <div>
           
            <div >
                My profile :
                <strong >Alias(pseudo): {pseudo}</strong>
                <strong>Email: </strong>{currentUser.email}
                <strong>UID: {currentUser.uid}</strong>
                <strong>JSON: {JSON.stringify(currentUser)}</strong>

                <div>
                    <Link to='/update-profile'> Update your profile</Link>
                </div>

                <button onClick={() => handleLogout()}>
                    Logout
                </button>
                <button onClick={() => history.push('/')} >Retour à l'Accueil</button>

            </div>

           
            <div>
                <LikedList />

            </div>

        </div>
    )
}