import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import { Redirect, Route, Switch } from 'react-router-dom';//IMPORTANT:: auto import e react-router theke import hoi, but react-router-dom is recommended, so manually korte hobe eta
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import { Component } from 'react';
import { logout } from '../redux/authActionCreators';
import Logout from './Auth/Logout';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }

}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
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
                <Route path='/logout' component={Logout} />
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

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

//MUST READ
//authCheck ta ekhan theke dispatched hobe, but dispatch howar specific kono conditional rendering nai Main() functional comp er bhitor
//Tai amra ei compo ta mount er shathe shahe call korte chai authCheck ke
//But eta functional component e kora possible na
//So amra full compo ta ke class compo te convert korsi to use compoDidMount
//N.B: func compo te reducer theke asha state ke props.blahblah likhtam, but class compo kore felse dekhe this.props.blahblah likhte hobe