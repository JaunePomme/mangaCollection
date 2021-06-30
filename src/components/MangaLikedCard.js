import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/NativeSelect';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { firestore } from '../firebase';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function MangaLikedCard({ item, completedList }) {

    const [open, setOpen] = useState(false);
    const [openbis, setOpenbis] = useState(false);
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [inputStatus, setInputStatus] = useState('');
    const { currentUser } = useAuthentication();
    const [inputReview, setInputReview] = useState('');
    const [inputScoring, setInputScoring] = useState('');

    const [inputChapter, setInputChapter] = useState();

    const valuesForScoring = [
        {
            value: 'Top-notch quality',
            label: 'Top-notch quality (10/10)',
        },
        {
            value: 'Very Good',
            label: 'Very Good(8-9/10)',
        },
        {
            value: 'Good',
            label: 'Good (6-7/10)',
        },
        {
            value: 'Watchable',
            label: 'Watchable (5-6/10)',
        },
        {
            value: 'Bad',
            label: 'Bad (4-5/10)',
        },
        {
            value: 'Don\'t watch it',
            label: 'Don\'t watch it (below 4/10)',
        },
        {
            value: 'Not decided yet',
            label: 'Not decided yet',
        },
    ];

    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    function handleSeeMore(searchDataItem) {
        console.log(searchDataItem)
    }

    const handleOpen = () => {
        setOpen(true);
        console.log('handle open reached')
    };

    const handleClose = () => {
        setOpen(false);
        console.log('handle close')
    };

    const handleOpenbis = () => {
        setOpenbis(true);
        console.log('handle open reached')
    };

    const handleClosebis = () => {
        setOpenbis(false);
        console.log('handle close')
    };
    function handleSave() {

        // var db = firestore.collection("scans").doc(currentUser.uid).collection('manga').doc(item.title);
        // var dbstatus = firestore.collection('status').doc(currentUser.uid).collection('manga').doc(item.title);
        // return dbstatus.set({
        //     'status': status,
        // })
        //     .then(() => {
        //         db.set({
        //             'chapter': inputChapter
        //         })
        //         console.log(status)
        //     })
        //     .then(() => {
        //         console.log("Document added!");
        //     })
        //     .catch((error) => {
        //         console.error("Error updating document: ", error);
        //     });


        var batch = firestore.batch();

        var statusRef = firestore.collection("status").doc(currentUser.uid).collection('manga').doc(item.title);
        batch.set(statusRef, { status: inputStatus });
        if(inputStatus==='Completed') setInputChapter(item.chapters);
        var scansRef = firestore.collection('scans').doc(currentUser.uid).collection('manga').doc(item.title);
        batch.set(scansRef, { "chapter": inputChapter });

        batch.commit().then(() => {
            console.log("Document added!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });;
        handleClose();

    }

    function handleReviewAndScore() {
        console.log('dans handleReview')
        var batch = firestore.batch();

        var reviewsRef = firestore.collection("reviews").doc(currentUser.uid).collection('manga').doc(item.title);
        batch.set(reviewsRef, { 'review': inputReview, });

        var scoresRef = firestore.collection('scores').doc(currentUser.uid).collection('manga').doc(item.title);
        batch.set(scoresRef, { 'score': inputScoring });

        batch.commit().then(() => {
            console.log("Document added!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });;
        handleClosebis();
    }



    useEffect(() => {
        function handleReviewsRetrieve() {
            var docRef = firestore.collection("reviews").doc(currentUser.uid).collection('manga').doc(item.title);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data de handleReviewsRetrieve:", doc.data());
                    setInputReview(doc.data().review);

                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        function handleScoresRetrieve() {
            var docRef = firestore.collection("scores").doc(currentUser.uid).collection('manga').doc(item.title);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data de handleScoresRetrieve:", doc.data());
                    setInputScoring(doc.data().score);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
        function handleScansRetrieve() {
            var docRef = firestore.collection("scans").doc(currentUser.uid).collection('manga').doc(item.title);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data de handleScansRetrieve:", doc.data());
                    setInputChapter(doc.data().chapter);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        function handleStatusRetrieve() {
            var docRef = firestore.collection("status").doc(currentUser.uid).collection('manga').doc(item.title);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data de handleScansRetrieve:", doc.data());
                    setInputStatus(doc.data().status);
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        handleStatusRetrieve();
        handleScansRetrieve();
        handleReviewsRetrieve();
        handleScoresRetrieve();
    }, [item.title, currentUser.uid])

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
                                {inputReview}
                                <div>
                                    <strong>{inputScoring}</strong>
                                </div>
                            </div>
                            <div>
                                {inputStatus}
                            </div>
                            Score: {item.score}/10

                            <div className='manga-volumes'>
                                volumes: {item.volumes}
                            </div>
                            <div className='manga-chapters'>
                                chapters I read: {inputChapter}/{item.chapters}
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
                            <button type='button' className='btn-behind-mangacard' onClick={() => handleOpenbis()} >
                                Give review et note
                            </button>
                            <div>
                                <button
                                    type="button"
                                    className='btn-behind-mangacard'
                                    onClick={handleOpen}>
                                    Update {item.title}
                                    {/* <Fab color="secondary" aria-label="edit">
                                        <EditIcon />
                                    </Fab> */}
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
                                            <p id="transition-modal-description">

                                                {/* ici mettre du blabla
                                                <Checkbox
                                                    defaultChecked
                                                    onChange={handleChangeCheckBox}
                                                />

                                                <FormControlLabel
                                                    control={<Checkbox color='primary' icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                                                    label="Custom icon"
                                                /> */}

                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="manga-status">Status</InputLabel>
                                                    <Select
                                                        native
                                                        value={inputStatus}
                                                        onChange={(event) => {
                                                            setInputStatus(event.target.value)
                                                        }}
                                                        inputProps={{
                                                            name: 'status',
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        <option value={'OnGoing'}>OnGoing</option>
                                                        <option value={'Completed'}>Completed</option>
                                                        <option value={'Plan to read'}>Plan to read</option>
                                                    </Select>
                                                </FormControl>
                                                <div>
                                                    Chapters read: {(inputStatus === 'Completed') ? item.chapters :
                                                        <input
                                                            type='number'
                                                            min='0'
                                                            step='1'
                                                            value={inputChapter}
                                                            onChange={e => setInputChapter(e.target.value)}
                                                            placeholder={0}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    handleSave();
                                                                }
                                                            }}>

                                                        </input>}/{item.chapters}
                                                </div>
                                                <div>
                                                    <button type='button' onClick={() => handleSave()}>
                                                        Save modifications
                                                    </button>
                                                </div>

                                            </p>
                                        </div>
                                    </Fade>
                                </Modal>

                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={openbis}
                                    onClose={handleClosebis}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openbis}>
                                        <div className={classes.paper}>
                                            <h2 id="transition-modal-title">Write your review about: {item.title}</h2>
                                            <p id="transition-modal-description">
                                                <TextareaAutosize
                                                    aria-label="minimum height"
                                                    rowsMin={6}
                                                    rowsMax={10}
                                                    onChange={e => setInputReview(e.target.value)}
                                                    value={inputReview}
                                                    placeholder="Write here..." />
                                                <div>

                                                    <TextField
                                                        id="outlined-select-scoring"
                                                        select
                                                        label="Select"
                                                        value={inputScoring}
                                                        onChange={(e) => setInputScoring(e.target.value)}
                                                        helperText="Please select your scoring"
                                                        variant="outlined"
                                                    >
                                                        {valuesForScoring.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                </div>
                                                <div>
                                                    <button type='button' onClick={() => handleReviewAndScore()}>
                                                        Save the modifications
                                                    </button>
                                                </div>

                                            </p>
                                        </div>
                                    </Fade>
                                </Modal>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
