import React, {Component} from 'react';
import Menu from '../../general/Menu';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../../general/ItemCard';
import Api from "../../../api/Api";
import Cart from "../../general/Cart";


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {menuItems: null, showCart: false, exchangeRate: 0}
    }

    componentDidMount() {
        Api.getMenu().then((res) => {
            this.setState({menuItems: res})
        })

        Api.getExchangeRate().then((res) => {
            this.setState({exchangeRate: res})
        })
    }


    render() {
        const {menuItems, showCart, exchangeRate} = this.state;
        const getCartClasses = () => {
            return "cart " + (showCart ? "cart-visible" : "");
        }

        const openCart = () => {
            this.setState({showCart: true});
        }

        const closeCart = () => {
            this.setState({showCart: false});
        }
        return <>
            <Menu showCart={true} onClickCart={openCart}/>
            <Grid container>
                <Grid
                    container item xs={12} lg={9} spacing={5}
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
                        <h2 class="font-300">Select From The Menu</h2>
                    </Grid>
                    {menuItems && menuItems.map((item) => {
                        return <ItemCard key={item.id} item={item}/>
                    })}
                </Grid>
                <Grid
                    container item xs={0} lg={3}
                    direction="row"
                    className={getCartClasses()}
                >
                    <Cart editable={true} exchangeRate={exchangeRate} onClose={closeCart}/>
                </Grid>
            </Grid>

        </>
    }
}
