import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '75%',
    },
    content: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '70px'
    },
    actions: {
        justifyContent: 'space-between'
    }
}));


function ItemCard(props) {
    const classes = useStyles();
    const {id, title, image_url, description, price} = props.item;
    return (
        <Grid
            container item xs={6} md={4} spacing={2}
            direction="row"
            justify="center"
            alignItems="center"

        >
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={image_url}
                    title={title}
                />
                <CardContent className={classes.content}>
                    <Typography>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <span>$ {price}</span>
                    <IconButton>
                        <AddShoppingCartIcon/>
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    )
}

export default ItemCard
