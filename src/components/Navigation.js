import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '../contexts/AuthenticationContext';

export default function Navigation() {

    const {currentUser}=useAuthentication(); 

    return (
        <div>
            {/* <ul className='nav-list'>

                <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/'}>
                    <li style={{marginLeft:25}}>
                    <FontAwesomeIcon icon={faHome} />Home
                    </li>
                </NavLink>

                <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/firebasereviews'}>
                    <li style={{ marginLeft: 25 }}> Search for username</li>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/profile'}>
                    <li style={{ marginLeft: 25 }}> My collection</li>
                </NavLink>

            </ul> */}
            {currentUser? '': 
            <>
            <div>
            <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/login'}>
                    <p style={{ marginLeft: 25 }}> Login </p>
                </NavLink>
            </div>

            <div>
            <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/signup'}>
                    <p style={{ marginLeft: 25 }}> Sign up</p>
                </NavLink>
            </div>
            </>
            }
        </div>
    )

}


