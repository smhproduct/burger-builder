import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { Route } from 'react-router-dom';//IMPORTANT:: auto import e react-router theke import hoi, but react-router-dom is recommended, so manually korte hobe eta

const Main = props => {
    return (
        <div>
            <Header />
            <div className='container'>
                <Route path='/orders' component={Orders} />
                <Route path='/checkout' component={Checkout} />
                <Route path="/login" component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />

            </div>

        </div>
    )
}

export default Main;