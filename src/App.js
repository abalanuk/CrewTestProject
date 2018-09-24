import React, {Component} from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import combinedReducers from './redux';
import Crew from './components/Crew';
import logo from './assets/images/logo.png';

import './App.css';

const store = createStore(combinedReducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Crew Applications</h1>
                </header>
                <Provider store={store}>
                    <Crew/>
                </Provider>
            </div>
        );
    }
}

export default App;
