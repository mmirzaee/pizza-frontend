import React from 'react';
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AppBar, Toolbar, Hidden, IconButton} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    logo: {
        height: '50px',
        width: '50px',
        marginTop: '7px'
    },
    siteName: {
        display: 'inline',
        fontSize: '20px',
        float: 'right',
        marginTop: '20px',
        color: '#ffffff'
    }
}));

function Menu(props) {
    const {onSidebarOpen, onClickProfile} = props;
    const classes = useStyles();

    return (
        <div className="menu-container-style">
            <AppBar position="static">
                <Toolbar className="menu-style">
                    <div>
                        <Link className="menu-link-style" to={'/'}>
                            <img src="https://github.com/mmirzaee/pizza-backend/raw/master/pizza.png"
                                 className={classes.logo}/>
                            <h1 className={classes.siteName}>InnoPizza</h1>
                        </Link>
                    </div>
                    <div className={classes.flexGrow}/>
                    <IconButton
                        color="inherit"
                        onClick={onClickProfile}
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                    <Hidden lgUp>
                        <IconButton
                            color="inherit"
                            onClick={onSidebarOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Menu
