import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


function OrderItem(props) {
    const add = () => {
        props.add(props.data)
    }

    const remove = () => {
        props.remove(props.data)
    }

    const labelId = `checkbox-list-secondary-label-${props.data.id}`;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    src={props.data.image_url}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={props.data.title + ' ($' + props.data.price + ')'}/>
            <ListItemSecondaryAction>
                <IconButton onClick={remove}>
                    <RemoveIcon/>
                </IconButton>
                <span>{props.data.quantity}</span>
                <IconButton onClick={add}>
                    <AddIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}


export default OrderItem;
