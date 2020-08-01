import React from 'react';
import {Link} from "react-router-dom";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AppBar, Toolbar, Hidden, IconButton, Badge} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Api from "../../api/Api";
import {updateTokenAction} from "../../actions/UpdateTokenAction";
import {updateProfileAction} from "../../actions/UpdateProfileAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import {useSnackbar} from 'material-ui-snackbar-provider'


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}


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
    },
    colorWhite: {
        color: '#ffffff'
    }
}));

const mapStateToProps = (state) => ({
    items: state.items,
    profile: state.profile,
    token: state.token,
})

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function Menu(props) {

    const {onClickCart, token} = props;
    const classes = useStyles();
    const snackbar = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [email, setEmail] = React.useState();
    const [isLoadingDialog, setIsLoadingDialog] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);

    const login = () => {
        setOpen(true);
    };

    const logout = () => {
        props.dispatch(updateProfileAction({}));
        props.dispatch(updateTokenAction(null));
        snackbar.showMessage('Logged out')
    };

    const handleLoginDialogClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setLoginError(false);
        setValue(newValue);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAuth = (api) => {
        setLoginError(false);
        setIsLoadingDialog(true);
        api({username: username, password: password, email: email}).then(data => {
            props.dispatch(updateTokenAction(data.token));
            Api.getProfile(data.token).then(data => {
                props.dispatch(updateProfileAction(data));
                snackbar.showMessage('Logged in successfully')
            });
            setIsLoadingDialog(false);
            handleLoginDialogClose();
        }).catch(() => {
            setLoginError(true);
            setIsLoadingDialog(false);
        });
    };

    const handleRegister = () => {
        handleAuth(Api.postRegister);
    };

    const handleLogin = () => {
        handleAuth(Api.postLogin);
    };

    const getItemsCount = () => {
        let count = 0;
        props.items.forEach(i => {
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
                                     alt="logo"
                                     className={classes.logo}/>
                                <h1 className={classes.siteName}>InnoPizza</h1>
                            </Link>
                        </div>
                        <div className={classes.flexGrow}/>
                        {token &&
                        <Link to={'/orders'}>
                            <IconButton
                                className={classes.colorWhite}
                                color="inherit"
                            >
                                <HistoryIcon/>
                            </IconButton>
                        </Link>
                        }
                        {!token ? <IconButton
                            color="inherit"
                            onClick={login}
                        >
                            <AccountCircleIcon/>
                        </IconButton> : <IconButton
                            color="inherit"
                            onClick={logout}
                        >
                            <ExitToAppIcon/>
                        </IconButton>
                        }
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

            <Dialog open={open} onClose={handleLoginDialogClose} maxWidth={'xs'} fullWidth={true}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Login" {...a11yProps(0)}/>
                        <Tab label="Register" {...a11yProps(1)}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username & password
                        </DialogContentText>
                        {loginError &&
                        <Alert severity="error">Invalid Username/Password</Alert>
                        }
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogin} color="primary">
                            Login
                            {isLoadingDialog &&
                            <CircularProgress color="inherit"/>
                            }
                        </Button>
                    </DialogActions>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DialogContent>
                        <DialogContentText>
                            Sign Up easily!
                        </DialogContentText>
                        {loginError &&
                        <Alert severity="error">Entered data are not valid</Alert>
                        }
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="dense"
                            id="Username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            margin="dense"
                            id="Password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginDialogClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleRegister} color="primary">
                            Register
                            {isLoadingDialog &&
                            <CircularProgress color="inherit"/>
                            }
                        </Button>
                    </DialogActions>
                </TabPanel>
            </Dialog>
        </>
    )
}

export default connect(mapStateToProps)(Menu);
