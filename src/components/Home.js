import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Home = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        window.recipes.GetRecipes().then(
            (result) => {
                setRecipes(result)
            },
            (err) => {
                console.log(err)
            }
        ) 
    }, [])

    console.log(recipes)
    return (
        <ul>
            {recipes.map((recipe) => 
                <li key={recipe.Id}><Link to={"/recipe/" + recipe.Name}>{recipe.Name}</Link></li>
            )}
        </ul>
    )
}

export default Home;