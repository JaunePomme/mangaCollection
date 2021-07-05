import React, {useEffect, useState} from 'react'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import UserList from './UserList';


export default function FirebaseReviews() {

    const {currentUser}=useAuthentication();
    const [inputUsers,setInputUsers]=useState();

    // useEffect(() => {
    //     function handleUsersRetrieve() {
    //         var docRef = firestore.collection("users").doc(currentUser.uid);
    //         docRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 console.log("Document data de handleUsersRetrieve:", doc.data());
                    
    //                 setInputUsers(doc.data());

    //             } else {
    //                 // console.log("No such document");
    //             }
    //         }).catch((error) => {
    //             console.log("Error getting document:", error);
    //         });
    //     }
    //     handleUsersRetrieve();
    // }, []);

    return (
        <div>
            
            {/* <UserList data={inputUsers}/> */}



        </div>
    )
}
