import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/pages/home/Home';
import {Provider} from 'react-redux';
import UpdateCart from './reducers/UpdateCart';
import {createStore} from 'redux';

const store = createStore(
    UpdateCart,
);

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={Home}/>
            </Router>
        </Provider>
    )
}

export default App
