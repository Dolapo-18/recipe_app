import React, {useEffect, useState} from 'react';

import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = '25051492'
  const API_KEY = '3e6a96c5c1361759bf221f77eb2a7189'

  const [recipes,  setRecipes] = useState([])
  const [search, setSearch] = useState('')
  //set default query to chicken
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  
  }, [query])


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await response.json()
    
    setRecipes(data.hits)
    console.log(data.hits)
  }

//update search variable from users
  const updateSearch = event => {
    setSearch(event.target.value);
    
  }

  //retrieve query string from user
  const getSearch = event => {
    //prevent browser from loading everytime
    event.preventDefault(event);
    setQuery(search)
    setSearch('')

  }




  
    return(
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">Search</button>
        </form>

        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.image}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    )
  
}

export default App;
