import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/pages/home/Home';
import {Provider} from 'react-redux';
import UpdateCart from './reducers/UpdateCart';
import {createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'


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
                <Router>
                    <Route exact path="/" component={Home}/>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
