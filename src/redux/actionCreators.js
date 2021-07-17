import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype
    }
}

export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype
    }
}

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = (err) => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
        payload: err
    }
}

export const fetchOrders = () => dispatch => {
    axios.get("https://burger-builder-8cb2b-default-rtdb.firebaseio.com/orders.json")
        .then(response => {
            dispatch(loadOrders(response.data));
        })
        .catch(err => dispatch(orderLoadFailed(err.message)))

}