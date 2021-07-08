import React, { Component } from 'react';
import Burger from './Burger/Burger';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },

        ]
    }
    render() {
        console.log(this.state.ingredients);
        return (
            <div>
                <Burger ingredients={this.state.ingredients} />
            </div>
        )
    }
}