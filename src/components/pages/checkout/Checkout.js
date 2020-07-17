import React, {Component} from 'react';
import Menu from "../../general/Menu";
import {connect} from "react-redux";
import {compose} from "redux";
import Api from "../../../api/Api";
import Cart from "../../general/Cart";
import CartUtils from "../../../utils/CartUtils";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom'
import {updateCartAction} from "../../../actions/UpdateCartAction";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const mapStateToProps = (state) => ({
    items: state.items,
});

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {exchangeRate: 0, isLoading: false, fullName: '', mobile: '', address: '', showSuccess: false}
    }


    componentDidMount() {
        Api.getExchangeRate().then((res) => {
            this.setState({exchangeRate: res})
        })
    }


    handleChangeFullName = (event) => {
        this.setState({fullName: event.target.value});
    }
    handleChangeMobile = (event) => {
        this.setState({mobile: event.target.value});
    }
    handleChangeAddress = (event) => {
        this.setState({address: event.target.value});
    }
    handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({showSuccess: false})
    };

    submit = () => {
        const {fullName, mobile, address} = this.state;

        let postData = {
            full_name: fullName,
            mobile: mobile,
            address: address,
            items: CartUtils.toJson(this.props.items)
        };
        this.setState({isLoading: true})
        Api.sendOrder(postData).then((res) => {
            this.setState({isLoading: false, showSuccess: true}, () => {
                this.props.dispatch(updateCartAction([]));
                this.props.history.push('/');
            });

        })
    }


    render() {
        const {exchangeRate, isLoading, showSuccess} = this.state;

        return <>
            <Menu showCart={false}/>
            <Container fixed>
                <Grid container xs={12}
                      direction="row"
                      justify="center"
                >
                    <Grid container xs={12}
                          direction="row"
                          justify="center"
                    >
                        <h2 className="font-300">Your Cart - Complete order fields:</h2>
                    </Grid>
                    <Grid
                        container xs={12} lg={6}
                        justify="center"
                    >
                        <Cart editable={false} exchangeRate={exchangeRate}/>
                    </Grid>
                    <Grid xs={12} lg={6} container
                    >
                        <Grid container xs={12} lg={6} item spacing={5}
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <TextField
                                required
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                disabled={isLoading}
                                onChange={this.handleChangeFullName}
                            />
                        </Grid>
                        <Grid container xs={12} lg={6} item spacing={5}
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <TextField
                                required
                                label="Mobile Number"
                                variant="outlined"
                                fullWidth
                                disabled={isLoading}
                                onChange={this.handleChangeMobile}
                            />
                        </Grid>
                        <Grid container xs={12}
                              justify="center"
                        >
                            <TextField
                                required
                                label="Address"
                                variant="outlined"
                                multiline
                                fullWidth
                                rows={4}
                                disabled={isLoading}
                                onChange={this.handleChangeAddress}
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12}
                          justify="center"
                    >
                        <Button variant="outlined" color="secondary" onClick={this.submit} disabled={isLoading}>
                            {isLoading &&
                            <CircularProgress color="inherit"/>
                            }
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={showSuccess} onClose={this.handleCloseAlert} autoHideDuration={6000}>
                <Alert onClose={this.handleCloseAlert} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Checkout);
