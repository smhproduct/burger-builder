import * as actionTypes from './actionTypes'

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
}

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },

    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchasable: false,
    loadfailedmessage: null,
    token: null,
    userId: null
}

export const reducer = (state = INITIAL_STATE, action) => {

    const ingredients = [...state.ingredients];

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let i of ingredients) {
                if (i.type === action.payload) {
                    i.amount++;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
            }

        case actionTypes.REMOVE_INGREDIENT:
            for (let i of ingredients) {
                if (i.type === action.payload) {
                    if (i.amount <= 0) return state;
                    i.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
            }

        case actionTypes.RESET_INGREDIENT:
            for (let i of ingredients) {
                i.amount = 0;
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: 80,
                purchasable: false
            }

        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0
            }

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let i in action.payload) {
                orders.push({
                    ...action.payload[i],
                    id: i,
                })
            }

            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }

        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                loadfailedmessage: action.payload,
                orderLoading: false,
                orders: []
            }

        //Auth Cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }

        default:
            return state;
    }
}