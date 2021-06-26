import React, { useRef, useEffect } from 'react'
// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';
// import { firestore } from '../firebase';

export default function UpdateProfile() {

    const passwordRef = useRef();
    const confirmedPasswordRef = useRef();
    const pseudoRef = useRef();
    const { updatePassword, logout } = useAuthentication();
    // const [pseudo, setPseudo] = useState();
    const { history } = useHistory();
    // const {currentUser}=useAuthentication();

    function handleSubmit() {


        if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
            return alert('password do not match.');
        }

        const promises = []
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        // if (pseudoRef.current.value) {
        //     localStorage.setItem('pseudo', pseudoRef.current.value);
        //     console.log(currentUser.uid)
        //     var db=firestore.collection("users").doc(currentUser.uid);
        //     return db.update({
        //         pseudo: pseudoRef.current.value,
        //         name:'ho'
        //     })
        //         .then(() => {
        //             console.log("Document updated!");
        //         })
        //         .catch((error) => {
        //             console.error("Error updating document: ", error);
        //         });


        // }

        if (promises.length > 1) {
            Promise
                .all(promises)
                .then(() => {
                    history.push('/profile');
                    alert('password modified')
                })
                .catch(() => {
                    alert('failed to update account.')
                })
        }
    }


    async function handleLogout() {
        try {
            console.log('logout')
            await logout();
            history.push('/login')
        } catch {
            alert('you failed to logout')
        }

    }

    useEffect(() => {

        pseudoRef.current.value = localStorage.getItem('pseudo');
    }, [])

    return (
        <div>
            {/* {error} */}
            <form id='update-form' onSubmit={handleSubmit} placerholder='Type in..'  >
                <div className='form-group'>
                    <label htmlFor='pseudo'>Alias(pseudo):</label>
                    <input name='pseudo' type='text' placeholder='alias here..' ref={pseudoRef} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='password here..' ref={passwordRef} />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmed-password'>Confirmed password:</label>
                    <input type='password' placeholder='password here..' ref={confirmedPasswordRef} />
                </div>
                <button type='submit'  >Update </button>
            </form>
            <button onClick={() => handleLogout()}  >Log out</button>
            <Link to='/profile'>Cancel</Link>
        </div>
    )
}
