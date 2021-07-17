import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css'

const Burger = props => {
    let ingredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];//eta dara ami ingredArr er each item ke niye multiple Array banabo jekhane item.amount ta ekhane denote kore that koita index thakbe ek ekta array te
        return amountArr.map(() => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, [])
    console.log(ingredientArr);
    /*.reduce() likhsi ekdom ingredienArr er () jokhon end hoise tokhon, means  reduce() is a function of ingredArr
     Ei func duita value ne, notice, first value ta ekta function that itself takes 2 parameters(arr, element) & 2nd param is empty []
     **1st param**
     ekhane amra (arr, element) 2ta param ni, arr hocche jotogula arrays amar ingredArr er bhitor ase, ar element hocche oishob arrays er particular elements
    ekhane arrow func chalaye amra arr param er bhitor e shob array element gula ke eke eke concat kore disi, so shobar internal elements ekhon ek jaygay chole ashche
    **2nd param**
    ekhane [] disi, karon arr er bhitor ja store hoise ta amra neat kothao rakhte chai
    so [] call howa mane starting e arr empty kore rakha ase, ebar eke eke value gula dhukbe
    */

    if (ingredientArr.length === 0) {
        ingredientArr = <p> Please add some ingredients!</p>
    }

    return (
        <div className='Burger'>
            <Ingredient type='bread-top' />
            {ingredientArr}
            <Ingredient type='bread-bottom' />
        </div>
    )
}

export default Burger;