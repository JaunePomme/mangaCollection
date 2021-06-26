import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';

const AuthenticationContext = React.createContext()

export function useAuthentication() {
    return useContext(AuthenticationContext);
}


export function AuthenticationProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Change only the content of the function in case you don't want to use Firebase.
    //Signup
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }


    //Login
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    //logout
    function logout() {
        return auth.signOut()
    }

    //resetpassword
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }


    function updateEmail(email) {
        return currentUser.updateEmail(email);

    }
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }


    //specific to firebase
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);

        })
        return unsubscribe;
    });



    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,

    }

    return (

        <AuthenticationContext.Provider value={value}>
            {!loading && children}
        </AuthenticationContext.Provider>


    )


}