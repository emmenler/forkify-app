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

// --- LOADING RECIPE ---
export async function loadRecipe(id) {
  try {
    // Getting the recipe from the API
    const data = await getJSON(`${API_URL}/${id}`);

    // Formatting the recipe object
    state.recipe = formatRecipe(data);
    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id)) {
      state.recipe.isBookmark = true;
    } else {
      state.recipe.isBookmark = false;
    }
  } catch (err) {
    throw err;
  }
}

function formatRecipe(data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    // Add 'key' conditionally
    ...(recipe.key && { key: recipe.key }),
  };
}

// --- SEARCH RESULTS ---
export async function loadSearchResults(query) {
  try {
    // Loading search results for provided query
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Updating search results object in STATE
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

  // Counting first/last elements of current page
  const first = (page - 1) * state.search.resultsPerPage;
  const last = page * state.search.resultsPerPage;

  // Returning portion of the search results beetween first and last
  return state.search.results.slice(first, last);
}

// --- RECIPE SERVINGS ---
export function updateServings(newServings) {
  // Update serings of each ingredient of recipe object
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
}

// --- BOOKMARKS ---
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

// --- SEND USER RECIPE ---
export async function addUserRecipe(userRecipe) {
  try {
    // Create anformat an array of ingredients from user recipe
    const ingredients = Object.entries(userRecipe)
      .filter((ent) => ent[0].startsWith('ingredient') && ent[1])
      .map((ing) => {
        const ingredients = ing[1].replaceAll(' ', '').split(',');
        if (ingredients.length != 3)
          // Throw error if user submitted in wrong format
          throw new Error('Wrong input format! Please, use correct format.');

        // Create an object of ingredients from ingredients array
        const [quantity, unit, description] = ingredients;
        return {
          quantity: !quantity ? null : Number(quantity),
          unit,
          description,
        };
      });

    // Create a final recipe object that will be sent to API
    const formattedRecipe = {
      cooking_time: Number(userRecipe.cookingTime),
      image_url: userRecipe.image,
      ingredients,
      publisher: userRecipe.publisher,
      servings: Number(userRecipe.servings),
      source_url: userRecipe.sourceUrl,
      title: userRecipe.title,
    };

    // Send recipe object to API
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, formattedRecipe);

    // Set API data as current recipe
    state.recipe = formatRecipe(data);

    // Make user's recipe bookmarked
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}
