import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MangaProfile.css'


export default function MangaProfile() {

    let { mal_id } = useParams();
    let location = useLocation();
    console.log(location.state)
    const data = location.state.data;
    
    const chapters = data.chapters;
    const image_url = data.image_url;
    const score = data.score;
    const title = data.title;
    const url = data.url;
    const volumes = data.volumes;
    const synopsis = data.synopsis;
    const members = data.members;
    const like=location.state.like;


    return (
        <div className='container'>

            {like &&
            <div className='profile-liked'>
                <strong>This item is in your favorite list.</strong>
            <FontAwesomeIcon icon={'user'}></FontAwesomeIcon> 
            
            </div>}

            <div>
                Title: {title}

            </div>

            <div>
                <img src={image_url}
                    alt={title}
                    style={{ maxHeight: 500 }} />
            </div>


            <div>
                ID of the item: {mal_id}

            </div>

            <div>
                Chapters: {chapters}

            </div>

            <div>
                Score: {score}

            </div>

            <div>
                Synopsis: {synopsis}

            </div>

            <div>
                Volumes released: {volumes}

            </div>

            <div>
               url to myAnimList: {url}

            </div>

            <div>
                Members on myAnimList: {members}

            </div>


        </div>
    )
}
