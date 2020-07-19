import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/pages/home/Home';
import Checkout from './components/pages/checkout/Checkout';
import OrderHistory from './components/pages/history/OrderHistory';
import {Provider} from 'react-redux';
import UpdateCart from './reducers/UpdateCart';
import {createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, UpdateCart)

const store = createStore(
    persistedReducer,
);

const persistor = persistStore(store)

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="root-container">
                    <Router>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/checkout" component={Checkout}/>
                        <Route exact path="/orders" component={OrderHistory}/>
                    </Router>
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App
