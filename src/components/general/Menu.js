import React from 'react';
import {Link} from "react-router-dom";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AppBar, Toolbar, Hidden, IconButton, Badge} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";


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
        marginTop: '-6px'
    },
    siteName: {
        display: 'inline',
        fontSize: '20px',
        float: 'right',
        marginTop: '6px',
        color: '#ffffff',
        fontWeight: '300'
    }
}));

const mapStateToProps = (state) => ({
    items: state.items,
    profile: state.profile,
})

function Menu(props) {
    const [open, setOpen] = React.useState(false);
    const onClickProfile = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {onClickCart} = props;
    const classes = useStyles();
    const getItemsCount = () => {
        let count = 0;
        props.items.map(i => {
            count += i.quantity;
        });
        return count;
    };
    return (
        <>
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
                        {props.showCart &&
                        <Hidden lgUp>
                            <IconButton
                                color="inherit"
                                onClick={onClickCart}
                            >
                                <Badge badgeContent={getItemsCount()} color="primary">
                                    <ShoppingBasketIcon/>
                                </Badge>
                            </IconButton>
                        </Hidden>
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your username & password
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Username"
                        label="Username"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default connect(mapStateToProps)(Menu);
