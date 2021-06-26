import React, { useRef, useState, useEffect } from 'react'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuthentication();
    const history = useHistory();
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuthentication();

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/profile')
            
        } catch(error) {
            alert('bug' + error)
            setError('failed to log in')
        }
        setLoading(false);

    }

    //todo à modif, cross origin error
    useEffect(() => {
        // emailRef.current.value = (JSON.parse(localStorage.getItem('email')))
    }, [])



    return (
        <div>
            {currentUser && currentUser.userId}
            {error}
            <form id='login-form' onSubmit={handleSubmit} placerholder='Type in..'  >
                <div className='form-group'>
                    <label htmlFor='email'> Email:</label>
                    <input name='email' type='email' placeholder='email here..' required ref={emailRef} />

                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' type='password' placeholder='password here..' required ref={passwordRef} />
                </div>
                <button disabled={loading} type='submit'>Log in</button>
            </form>

            <Link to={'/forgot-password'}> Forgot password?</Link>

        </div>
    )
}
