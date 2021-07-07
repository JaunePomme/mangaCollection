import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAt } from '@fortawesome/free-solid-svg-icons';


export default function About() {


    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <div>
                <strong>

                    <p>
                        I used HTML, CSS, JS(ES6, REACT) in order to make this website.
                        For the database, I used Firebase (Authentication, Firestore, Hosting).
                    </p>
                    <p>
                        Here is the link to my github if you want to check out the code.
                    </p>
                    <p>
                        Best regards,
                        Alex.
                    </p>
                </strong>
            </div>
            <FontAwesomeIcon icon={faGithub} />

            <Link
                onClick={() => openInNewTab('https://github.com/JaunePomme/mangaCollection')}>
                Github repository
            </Link>
            <p>
            You can contact me <FontAwesomeIcon icon={faAt} />    alexredon75@gmail.com
            </p>

           
        </div>
    )
}
