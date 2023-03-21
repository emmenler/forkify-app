import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJSON } from './helper.js';

// --- STATE ---
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// --- BUSINESS LOGIC ---
export async function loadRecipe(id) {
  try {
    // Getting the recipe from the API
    const data = await getJSON(`${API_URL}/${id}`);

    // Formatting the recipe object
    const { recipe } = data.data;
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
    console.error(`${err}`);
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    if (data.results === 0) throw new Error(`Invalid query: ${query}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
      };
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
}
