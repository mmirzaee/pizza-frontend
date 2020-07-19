import React, {useEffect} from 'react';
import Menu from '../../general/Menu';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../../general/ItemCard';
import Api from "../../../api/Api";
import Cart from "../../general/Cart";

function Home() {
    const [menuItems, setMenuItems] = React.useState(null);
    const [showCart, setShowCart] = React.useState(false);
    const [exchangeRate, setExchangeRate] = React.useState(0);


    useEffect(() => {
        Api.getMenu().then((res) => {
            setMenuItems(res);
        });

        Api.getExchangeRate().then((res) => {
            setExchangeRate(res);
        });
    }, []);

    const getCartClasses = () => {
        return "cart " + (showCart ? "cart-visible" : "");
    };

    const openCart = () => {
        setShowCart(true);
    };

    const closeCart = () => {
        setShowCart(false);
    };

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
                    <h2 className="font-300">Select From The Menu</h2>
                </Grid>
                {menuItems && menuItems.map((item) => {
                    return <ItemCard key={item.id} item={item}/>
                })}
            </Grid>
            <Grid
                container item xs={'auto'} lg={3}
                direction="row"
                className={getCartClasses()}
            >
                <Cart editable={true} exchangeRate={exchangeRate} onClose={closeCart}/>
            </Grid>
        </Grid>

    </>
}


export default Home;
