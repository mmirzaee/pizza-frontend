import React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function Menu(props) {
    return (
        <div className="menu-container-style">
            <AppBar position="static">
                <Toolbar className="menu-style">
                    <div>
                        <Link className="menu-link-style" to={'/'}>
                            Home
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Menu
