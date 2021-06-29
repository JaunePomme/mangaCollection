import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
export default function AnimeLikedCard({ item }) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    function handleSeeMore(searchDataItem) {
        console.log(searchDataItem)
    }

    const handleOpen = () => {

        setOpen(true);
        console.log('handle update reached')
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <div key={item.mal_id}>
                <div className='body-mangacard'>

                    <div >
                        <div className='front' >
                        
                            <div>
                                {item.title}
                            </div>
                            <div>
                                <img src={item.image_url}
                                    alt={item.title}
                                    style={{ maxHeight: 200 }} />
                            </div>
                            Score: {item.score}/10

                            <div className='manga-volumes'>
                                episodes: {item.episodes}
                            </div>
                            <div className='manga-chapters'>
                                rating: {item.rating}
                            </div>
                        </div>

                        <div className='back' >
                            <div className='manga-synopsis'>
                                Synopsis: {item.synopsis}
                            </div>


                            <Link to={{
                                pathname: '/manga-profile/' + item.mal_id,
                                state: { data: item, like: true }
                            }}>
                                <button className='btn-behind-mangacard' onClick={() => handleSeeMore(item)} >
                                    See more
                                </button>
                            </Link>

                            <button type='button' className='btn-behind-mangacard' onClick={handleOpen} >
                                Update
                            </button>
                            <Modal
                                    
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.paper}>
                                            <h2 id="transition-modal-title">Update: {item.title}</h2>
                                            <p id="transition-modal-description">ici mettre du blabla</p>
                                        </div>
                                    </Fade>
                                </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
