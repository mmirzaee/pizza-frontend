import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import CartUtils from '../../utils/CartUtils';
import {updateCartAction} from "../../actions/UpdateCartAction";
import OrderItem from "../general/OrderItem";
import Grid from "@material-ui/core/Grid";
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    close: {
        display: 'none',
        padding: '16px',
    }
}));

const mapStateToProps = (state) => ({
    items: state.items,
});

const deliveryFee = 5;

function Cart(props) {
    const classes = useStyles();

    const add = (i) => {
        props.dispatch(updateCartAction(CartUtils.add(i, props.items)));
    };

    const remove = (i) => {
        props.dispatch(updateCartAction(CartUtils.remove(i, props.items)));
    };

    const getTotal = () => {
        let total = 0;
        props.items.map((i) => {
            total += i.price * i.quantity;
        });

        total += deliveryFee;
        return total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        }) + ' / ' + (props.exchangeRate * total).toLocaleString('en-UK', {
            style: 'currency',
            currency: 'EUR',
        })
    };

    return (
        <List dense>
            <IconButton onClick={props.onClose} className={classes.close}>
                <CloseIcon/>
            </IconButton>
            <Grid
                container item xs={12} spacing={2}
                direction="row"
                justify="center"
                alignItems="center"

            >
                <h2 className="font-300">Your cart items:</h2>
            </Grid>

            {props.items.length == 0 &&
            <ListItem>No item is in your cart 🧐</ListItem>
            }

            {props.items.map((i) => <OrderItem key={i.id} data={i} add={add} remove={remove}
                                               editable={props.editable}/>
            )}

            {props.items.length > 0 &&
            <>
                <ListItem>Delivery Fee: {deliveryFee}</ListItem>
                <ListItem>
                    Total: {getTotal()}
                    {props.editable &&
                    <ListItemSecondaryAction>
                        <Link to="/checkout">
                            <Button variant="outlined" color="secondary">Checkout</Button>
                        </Link>
                    </ListItemSecondaryAction>
                    }
                </ListItem>
            </>
            }

        </List>
    );
}

export default connect(mapStateToProps)(Cart);
