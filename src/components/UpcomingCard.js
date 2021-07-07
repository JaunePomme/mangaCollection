import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function UpcomingCard({ item }) {
    const classes = useStyles();

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className='upcomingcard-container'>
            <div className='upcomingcard'>


                {/* <div>
                    {item.title}
                </div> */}

                <div>
                    <img src={item.image_url}
                        alt={'hi'}
                        style={{ maxHeight: 500 }} />
                </div>

                {/* <div>
                    {item.start_date}
                </div>
                <Typography className={classes.root}>
                    <Link
                        onClick={() => openInNewTab(item.url)}>
                        Click here to get more information
                    </Link>
                </Typography> */}
            </div>
        </div>
    )
}
