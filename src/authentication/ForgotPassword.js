import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';


export default function ForgotPassword() {

    const emailRef = useRef();
    const {resetPassword}=useAuthentication();


    async function handleSubmit(e) {
        e.preventDefault();

        try{
            await resetPassword(emailRef.current.value)
            alert('check your inbox and follow the instructions')
            console.log(emailRef.current.value)
        }catch(error){
            alert('failed to reset the password')
            alert(error)
        }
    }

    return (
        <div>
           
            <form id='login-form'  placerholder='Type in..'  >
                <div className='form-group'>
                    <label htmlFor='email'> Email:</label>
                    <input type='email' placeholder='email here..' required ref={emailRef} />
                </div>
            </form>

            <button type='submit' onClick={handleSubmit}>
                Reset password
            </button>

            <div>
                Already have an account ? <Link to='/login'> Log in</Link>
            </div>
            <div>
                Want to sign up ? <Link to='/signup'> Sign up</Link>
            </div>

        </div>
    )
}
