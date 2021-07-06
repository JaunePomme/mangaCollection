import React, { useState, useEffect} from 'react'
import { useHistory, useParams, useLocation } from 'react-router'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { Link } from 'react-router-dom';
import LikedList from '../components/LikedList';

export default function OtherProfile() {

    let history = useHistory();
    let {username}=useParams();
    let location = useLocation();
    const id=location.state.id
    const { currentUser, logout } = useAuthentication();
    const [pseudo, setPseudo] = useState('');

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
          Je suis:  <strong>{username}</strong> id: {id}et je regarde le compte de: 
          <strong>{pseudo}</strong> email: {currentUser.email} id: {currentUser.uid}

            <div >
                <div>
                    <Link to='/update-profile'> Update your profile</Link>
                </div>

                <button onClick={() => handleLogout()}>
                    Logout
                </button>
                <button onClick={() => history.push('/')} >Retour à l'Accueil</button>

            </div>

           
            <div>
                {/* <LikedList /> */}

            </div>

        </div>
    )
}