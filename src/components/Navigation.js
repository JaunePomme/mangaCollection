import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '../contexts/AuthenticationContext';
import FirebaseReviews from './FirebaseReviews';

export default function Navigation() {

    const {currentUser}=useAuthentication();

    return (
        <div>
            <ul className='nav-list'>

                <NavLink exact activeClassName='current' to={'/'}>
                    <li style={{marginLeft:25}}>
                    <FontAwesomeIcon icon={faHome} />
                    </li>
                </NavLink>

                <NavLink exact activeClassName='current' to={'/firebasereviews'}>
                    <li style={{ marginLeft: 25 }}> FireBaseReviews</li>
                </NavLink>
                <NavLink exact activeClassName='current' to={'/profile'}>
                    <li style={{ marginLeft: 25 }}> Profile</li>
                </NavLink>

            </ul>
            {currentUser? '': 
            <>
            <div>
            <NavLink exact activeClassName='current' to={'/login'}>
                    <p style={{ marginLeft: 25 }}> Login </p>
                </NavLink>
            </div>

            <div>
            <NavLink exact activeClassName='current' to={'/signup'}>
                    <p style={{ marginLeft: 25 }}> Sign up</p>
                </NavLink>
            </div>
            </>
}
        </div>
    )

}


