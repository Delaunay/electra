import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {Counter } from './Counter'


const Recipe = ({}) => {
    const recipe = useParams().recipe;

    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    useEffect(() => {
        window.recipes.GetRecipeIngredients(recipe).then(
            (result) => {
                setIngredients(result)
            },
            (err) => {
                console.log(err)
            }
        ) 

        window.recipes.GetRecipeSteps(recipe).then(
            (result) => {
                console.log("steps:", result)
                setSteps(result)
            },
            (err) => {
                console.log(err)
            }
        ) 
    }, [])

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map(item => <li key={Counter()}>{item.Quantity} {item.Unit} of {item.Name} </li>)}
            </ul>
            <h1>Steps</h1>
            <ol>
                {steps.map(item => <li key={Counter()}>{item.Name} {item.Description} </li>)}
            </ol>
        </div>
    )
}

export {Recipe};
