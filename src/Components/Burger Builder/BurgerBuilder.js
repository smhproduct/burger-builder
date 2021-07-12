import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },

        ]
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        for (let i of ingredients) {
            if (i.type === type) {

                i.amount++;
            }
        }
        this.setState({
            ingredients: ingredients
        })
    }

    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        for (let i of ingredients) {
            if (i.type === type) {
                if (i.amount <= 0) return;
                i.amount--;
            }
        }
        this.setState({
            ingredients: ingredients
        });
    }

    resetIngredientHandle = () => {
        const ingredients = [...this.state.ingredients];
        for (let i of ingredients) {
            i.amount = 0;
        }
        this.setState({
            ingredients: ingredients
        });
    }
    render() {
        console.log(this.state.ingredients);
        return (
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls ingredientAdded={this.addIngredientHandle} ingredientRemoved={this.removeIngredientHandle} ingredientReset={this.resetIngredientHandle} />
            </div>
        )
    }
}