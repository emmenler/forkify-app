import { async } from 'regenerator-runtime';

// ---STATE---
export const state = {
  recipe: {},
};

// ---BUSINESS LOGIC---
export async function loadRecipe(id) {
  try {
    // Getting the recipe from the API
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Formatting the recipe object
    const recipe = data.data.recipe;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
}
