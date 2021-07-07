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

export default function Card({ item }) {
    const classes = useStyles();

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className='card'>

            {/* <div>
                    {item.title}
                </div> */}
hi
            <img src={item.image_url}
                style={{ maxHeight: 500 }}
                alt={item.title}
            />

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
    )
}
