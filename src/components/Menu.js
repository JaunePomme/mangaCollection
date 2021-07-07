import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { faBars, faCalendar, faFilm, faHeart, faHome, faQuestion, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Menu() {


  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHome} />Home
          </li>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/firebasereviews'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faSearch} />Search for username</li>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/profile'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faHeart} /> My collection</li>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/movie'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faFilm} /> Movie</li>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/seasonal'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faCalendar} /> Seasonal</li>
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/genre'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faFilm} /> Genre</li>
        </NavLink>
        
        <NavLink style={{ textDecoration: 'none' }} exact activeClassName='current' to={'/about'}>
          <li style={{ marginLeft: 25 }}>
            <FontAwesomeIcon icon={faQuestion} /> About</li>
        </NavLink>
      </List>
      <Divider />

    </div>
  );
  return (
    <div>

      {
        <div className='menu-container'>
          <Button className='btn-menu' onClick={toggleDrawer('left', true)}><FontAwesomeIcon icon={faBars} /></Button>
          <SwipeableDrawer
            className='drawer-menu'
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </div>
      }
    </div>
  )
}
