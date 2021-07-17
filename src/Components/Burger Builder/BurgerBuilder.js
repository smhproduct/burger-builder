import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, resetIngredient, updatePurchasable } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        resetIngredient: () => dispatch(resetIngredient()),
        updatePurchasable: () => dispatch(updatePurchasable())
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }


    addIngredientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }

    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

    resetIngredientHandle = () => {
        this.props.resetIngredient();
        this.props.updatePurchasable();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.props.history.push('/checkout');
    }

    /* componentDidMount() {
        this.props.history.push('/checkout')
    } */
    //ETA ami rekhe disi commentout kore, karon history.push() eta ashole route er karone ashche, je compo ke route e rakha hoi or moddhe builtin kichu functionality ashe jeta amra ei compodidmount diye check korte pari
    //ei method handlecheckout e apply korsi
    //IMPORTANT jokhon ami kono ekta component e ekta activity ba click er maddhome arekta compo te jete chai, tokhon ei method apply kora hoi, e.g: continue to checkout' e click korle amake checkout navlink e niye jabe 

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        ingredientReset={this.resetIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: BDT {this.props.totalPrice.toFixed(0)}</h5>{/* tofixed use hoise ekhane fractional avoid korar jonno */}
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#d70f64' }} onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);