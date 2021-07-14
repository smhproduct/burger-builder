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

export const resetIngredient = igtype => {
    return {
        type: actionTypes.RESET_INGREDIENT,
        payload: igtype
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE
    }
}