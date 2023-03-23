import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helper.js';

// --- STATE ---
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

init();

// --- BUSINESS LOGIC ---
function init() {
  const storageBookmarks = localStorage.getItem('bookmarks');
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);
}

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
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id)) {
      state.recipe.isBookmark = true;
    } else {
      state.recipe.isBookmark = false;
    }
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
}

export function getSearchResultsPage(page) {
  state.search.page = page;
  const first = (page - 1) * state.search.resultsPerPage;
  const last = page * state.search.resultsPerPage;
  return state.search.results.slice(first, last);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
}

export function addBookmark(recipe) {
  // Add passed recipe object to bookmarks arr
  state.bookmarks.push(recipe);

  // Mark the recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.isBookmark = true;
  updateBookmarksStorage();
}

export function removeBookmark(id) {
  // Remove recipe from bookmarks arr
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // Mark the recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.isBookmark = false;
  updateBookmarksStorage();
}

function updateBookmarksStorage() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export async function addUserRecipe(userRecipe) {
  try {
    const ingredients = Object.entries(userRecipe)
      .filter((ent) => ent[0].startsWith('ingredient') && ent[1])
      .map((ing) => {
        const ingredients = ing[1].replaceAll(' ', '').split(',');
        if (ingredients.length != 3)
          throw new Error('Wrong input format! Please, use correct format.');
        const [quantity, unit, description] = ingredients;
        return {
          quantity: !quantity ? null : Number(quantity),
          unit,
          description,
        };
      });

    const formattedRecipe = {
      cooking_time: Number(userRecipe.cookingTime),
      image_url: userRecipe.image,
      ingredients,
      publisher: userRecipe.publisher,
      servings: Number(userRecipe.servings),
      source_url: userRecipe.sourceUrl,
      title: userRecipe.title,
    };
    console.log(formattedRecipe);

    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, formattedRecipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
}
