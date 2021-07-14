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
    totalPrice: 80,
    purchasable: false,
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
            }

        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0
            }

        default:
            return state;
    }
}