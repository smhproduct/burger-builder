import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';


const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },

        ],
        totalPrice: 80,
        modalOpen: false,
        purchasable: false,
    }

    updatePurchasable = ingredients => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount;
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];//ekhane ing_price[type] likhsi, taile jokhon ing_price er object call hobe, oitar index hishebe ami current function function er 'type' param er shathe match kore oi particular item er value ta show korbo 
        for (let i of ingredients) {
            if (i.type === type) {

                i.amount++;
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        })
        this.updatePurchasable(ingredients);
    }

    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        for (let i of ingredients) {
            if (i.type === type) {
                if (i.amount <= 0) return;
                i.amount--;
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(ingredients);
    }

    resetIngredientHandle = () => {
        const ingredients = [...this.state.ingredients];
        for (let i of ingredients) {
            i.amount = 0;
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: 80
        });
        this.updatePurchasable(ingredients);
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        ingredientReset={this.resetIngredientHandle}
                        price={this.state.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.state.purchasable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: BDT {this.state.totalPrice.toFixed(0)}</h5>{/* tofixed use hoise ekhane fractional avoid korar jonno */}
                        <Summary ingredients={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleModal}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}