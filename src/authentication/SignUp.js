import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';


export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmedPasswordRef = useRef();
    const pseudoRef = useRef();
    const { signup, currentUser } = useAuthentication();
    const history = useHistory();
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
                return setError('passwords are different')
            }
            localStorage.setItem('pseudo', pseudoRef.current.value);
            localStorage.setItem('email', emailRef.current.value);

            await signup(emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    var uid = userCredential.user.uid;
                    var mail = userCredential.user.email;

                    firestore.collection('likedAnimes').doc(uid).set({
                        likes: [],
                    });
                    firestore.collection('likedMangas').doc(uid).set({
                        likes: [],
                    });
                    firestore.collection('reviews').doc(uid).set({
                        id:[]
                    });
                    firestore.collection('scans').doc(uid).set({
                        id:[]
                    });
                    firestore.collection('episodes').doc(uid).set({
                        id:[]
                    });
                    firestore.collection('status').doc(uid).set({
                        id:[]
                    });
                    firestore.collection('scores').doc(uid).set({
                        id:[]
                    });
                    
                    firestore.collection('users').doc(uid).set({
                        pseudo: (localStorage.getItem('pseudo')),
                        email: mail,
                        userId: uid
                    })

                }

                ).then(() => {
                    history.push('/profile');
                });

        } catch (error) {
            // alert(error)
            console.log(error)
            setError('failed to create an account')
        }

    }

    return (
        <div>
            {currentUser && currentUser.email}
            {error}
            <form id='login-form' onSubmit={handleSubmit} placerholder='Type in..'  >
                <div className='form-group'>
                    <label htmlFor='pseudo'>Alias(pseudo):</label>
                    <input name='pseudo' type='text' placeholder='alias here..' required ref={pseudoRef} />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'> Email:</label>
                    <input name='email' type='email' placeholder='email here..' required ref={emailRef} />

                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' type='password' placeholder='password here..' required ref={passwordRef} />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmed-password'>Confirmed password:</label>
                    <input name='confirmed-password' type='password' placeholder='password here..' required ref={confirmedPasswordRef} />
                </div>
                <button type='submit'>
                    Sign up
                </button>
            </form>

            <div>
                Already have an account ? <Link to='/login'> Log in</Link>
            </div>


        </div>
    )
}
