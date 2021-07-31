import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { Redirect, Route, Switch } from 'react-router-dom';//IMPORTANT:: auto import e react-router theke import hoi, but react-router-dom is recommended, so manually korte hobe eta
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const Main = props => {
    let routes = null;
    if (props.token === null) {
        routes = (
            <Switch>
                <Route path="/login" component={Auth} />
                <Redirect to='/login' />
            </Switch>
        )
    } else {

        routes = (<Switch>
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>)
    }
    return (
        <div>
            <Header />
            <div className='container'>
                {routes}

            </div>

        </div>
    )
}

export default connect(mapStateToProps)(Main);