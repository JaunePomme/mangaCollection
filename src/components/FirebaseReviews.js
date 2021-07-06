import React, {useEffect, useState} from 'react'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import SearchBar from './SearchBar';

export default function FirebaseReviews() {

    const {currentUser}=useAuthentication();
    const [pseudoList,setPseudoList]=useState([]);

    useEffect(() => {
        function handleRetrievePseudo(){
            firestore.collection("users")
            .get()
            .then((querySnapshot) => {
                const newPseudoList = []
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    newPseudoList.push(doc.data())
                });
                setPseudoList(newPseudoList)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    
        }

        handleRetrievePseudo();
    }, []);




    return (
        <div>
            
            <SearchBar  pseudoList={pseudoList} setPseudoList={setPseudoList}/>
            
          



        </div>
    )
}
