import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import CartUtils from '../../utils/CartUtils';
import {updateCartAction} from "../../actions/UpdateCartAction";
import OrderItem from "../general/OrderItem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        marginTop: '15px'
    },
}));

const mapStateToProps = (state) => ({
    items: state.items,
})


function Cart(props) {
    const classes = useStyles();

    const add = (i) => {
        props.dispatch(updateCartAction(CartUtils.add(i, props.items)));
    }

    const remove = (i) => {
        props.dispatch(updateCartAction(CartUtils.remove(i, props.items)));
    }

    return (
        <List dense className={classes.root}>
            {props.items.map((i) => <OrderItem key={i.id} data={i} add={add} remove={remove}/>
            )}
        </List>
    );
}

export default connect(mapStateToProps)(Cart);
