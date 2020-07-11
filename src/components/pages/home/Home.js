import React, {Component} from 'react';
import Menu from '../../general/Menu';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../../general/ItemCard';
import Api from "../../../api/Api";
import {MenuItem} from "@material-ui/core";


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {menuItems: null}
    }

    componentDidMount() {
        Api.getMenu().then((res) => {
            console.log(res)
            this.setState({menuItems: res})
        })
    }


    render() {
        const {menuItems} = this.state;
        return <>
            <Menu/>
            <Grid container spacing={3}>
                <Grid
                    container item xs={12} md={9} spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container item xs={12} spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="center"

                    >
                        <h2>Select From The Menu</h2>
                    </Grid>
                    {menuItems && menuItems.map((item) => {
                        return <ItemCard item={item}/>
                    })}
                </Grid>
                <Grid
                    container item xs={12} md={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                </Grid>
            </Grid>

        </>
    }
}
