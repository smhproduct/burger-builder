import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import { Modal, ModalBody } from 'reactstrap';
import Order from './Order/Order';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        loadfailedmessage: state.loadfailedmessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }
    goBack = () => {
        this.props.history.goBack("/");
    }

    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders =
                /* THE BELOW MODAL WILL SHOW ONLY WHEN THERE IS ANY ERROR FROM SERVER */
                <Modal isOpen={this.props.orderErr} onClick={this.goBack}  >
                    <ModalBody>
                        <p>Sorry! Failed to Load Orders: {this.props.loadfailedmessage}</p>
                    </ModalBody>
                </Modal>
            //eta chaile para tag diyeo kora jay modal er jaygay, tokhon Order.js e je styling use korsilam same styling use korle bhalo dekhabe
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: '1px solid grey',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px',
                    marginBottom: '10px'
                }}>You have no Orders!</p>
            }
            else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }

        }

        return (
            <div>
                <div>
                    {this.props.orderLoading ? <Spinner /> : orders}
                </div>
            </div>


        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);