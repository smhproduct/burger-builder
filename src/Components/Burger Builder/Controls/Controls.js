import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControl = props => {
    return (
        <div className='d-flex'>
            <div className='m-auto ml-5' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.label}</div>
            <button onClick={props.removed} className='btn btn-danger btn-sm m-1'>Less</button>
            <button onClick={props.added} className='btn btn-success btn-sm m-1'>More</button>
        </div>
    )
}

const ResetBuild = props => {
    return (
        <div className='d-flex flex-row-reverse my-2'>
            <button onClick={props.reset} type='button' className='btn btn-light btn-sm mt-2 border border-dark'>Reset</button>
        </div>
    )
}

const Controls = props => {
    return (
        <div className='container ml-md-5' style={{ textAlign: 'center' }}>
            <Card style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center' }}>
                <CardHeader style={{ backgroundColor: '#d70f64', color: 'white' }}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.ingredientAdded(item.type)}
                                removed={() => props.ingredientRemoved(item.type)} />
                        })
                    }
                    <ResetBuild reset={() => props.ingredientReset()} />

                </CardBody>
                <CardFooter><h5>Price: BDT <strong>{props.price}</strong></h5></CardFooter>
                <Button style={{ backgroundColor: '#d70f64' }} disabled={!props.purchasable} onClick={props.toggleModal}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;