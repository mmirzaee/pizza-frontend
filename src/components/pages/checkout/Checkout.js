import React, {useEffect} from 'react';
import Menu from "../../general/Menu";
import {connect} from "react-redux";
import {compose} from "redux";
import Api from "../../../api/Api";
import Cart from "../../general/Cart";
import CartUtils from "../../../utils/CartUtils";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom'
import {updateCartAction} from "../../../actions/UpdateCartAction";
import {useSnackbar} from 'material-ui-snackbar-provider';


const mapStateToProps = (state) => ({
    items: state.items,
    token: state.token,
});


function Checkout(props) {
    const [exchangeRate, setExchangeRate] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [fullName, setFullName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [address, setAddress] = React.useState('');

    const snackbar = useSnackbar();

    useEffect(() => {
        Api.getExchangeRate().then((res) => {
            setExchangeRate(res);
        })
    }, []);

    const handleChangeFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleChangeMobile = (event) => {
        setMobile(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const submit = () => {
        const {token, items} = props;
        let postData = {
            full_name: fullName,
            mobile: mobile,
            address: address,
            items: CartUtils.toJson(items)
        };
        Api.sendOrder(postData, token).then((res) => {
            setLoading(true);
            snackbar.showMessage('Order submitted successfully');
            props.dispatch(updateCartAction([]));
            props.history.push(token ? '/orders' : '/');
        })
    };

    return <>
        <Menu showCart={false}/>
        <Container fixed>
            <Grid container item xs={12}
                  direction="row"
                  justify="center"
            >
                <Grid container item xs={12} spacing={2}
                      direction="row"
                      justify="center"
                >
                    <h2 className="font-300">Your Cart - Complete order fields:</h2>
                </Grid>
                <Grid
                    container item xs={12} lg={6} spacing={5}
                    justify="center"
                >
                    <Cart editable={false} exchangeRate={exchangeRate}/>
                </Grid>
                <Grid xs={12} lg={6} container item spacing={5}
                >
                    <Grid container xs={12} lg={6} item
                          direction="row"
                          justify="center"
                          alignItems="center"
                    >
                        <TextField
                            required
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            disabled={loading || props.items.length == 0}
                            onChange={handleChangeFullName}
                        />
                    </Grid>
                    <Grid container xs={12} lg={6} item
                          direction="row"
                          justify="center"
                          alignItems="center"
                    >
                        <TextField
                            required
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            disabled={loading || props.items.length === 0}
                            onChange={handleChangeMobile}
                        />
                    </Grid>
                    <Grid xs={12} container spacing={5} item
                    >

                        <TextField
                            required
                            label="Address"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                            disabled={loading || props.items.length === 0}
                            onChange={handleChangeAddress}
                        />
                    </Grid>
                </Grid>

                <Grid container item xs={12}
                      justify="center" spacing={5}
                >
                    <Button variant="outlined" color="secondary" onClick={submit}
                            disabled={loading || props.items.length === 0}>
                        {loading &&
                        <CircularProgress color="inherit"/>
                        }
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </>
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Checkout);
