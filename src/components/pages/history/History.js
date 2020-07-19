import React, {Component} from 'react';
import Menu from "../../general/Menu";
import {connect} from "react-redux";
import {compose} from "redux";
import Api from "../../../api/Api";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {withRouter} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const mapStateToProps = (state) => ({
    items: state.items,
    token: state.token,
    profile: state.profile,
});

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true, orderHistoryItems: null}
    }


    componentDidMount() {
        const {token} = this.props;
        Api.getOrdersHistory(token).then((res) => {
            this.setState({orderHistoryItems: res, isLoading: false})
        })
    }

    render() {
        const {isLoading, orderHistoryItems} = this.state;
        const statusEnum = {'1': 'Successfully Submitted', '2': 'In The Way', '3': 'Delivered', '0': 'Cancelled'};
        return <>
            <Menu showCart={true}/>
            <Container fixed>
                <Grid container item xs={12}
                      direction="row"
                      justify="center"
                >
                    <Grid container item xs={12} spacing={2}
                          direction="row"
                          justify="center"
                    >
                        <h2 className="font-300">Your orders history</h2>
                    </Grid>
                    <Grid xs={12} container item spacing={5}
                    >
                        {isLoading &&
                        <CircularProgress color="inherit"/>
                        }
                        {!isLoading &&
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Date & Time</TableCell>
                                        <TableCell>Order items</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderHistoryItems.map((row) => (
                                        <TableRow key={row}>
                                            <TableCell component="th" scope="row">
                                                {row.created_at}
                                            </TableCell>
                                            <TableCell>
                                                <ul>
                                                    {
                                                        row.items.map(i => (
                                                            <li>{i.title} ({i.quantity} x ${i.unit_price})</li>
                                                        ))
                                                    }
                                                </ul>
                                            </TableCell>
                                            <TableCell>{statusEnum[row.status]}</TableCell>
                                            <TableCell align="right">${row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }

                    </Grid>

                </Grid>
            </Container>
        </>
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(History);
