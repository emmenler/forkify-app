import View from './View.js';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.search-results');
  _errorMessage = `No recipes found for your query! Please try again.`;
}

export default new SearchResultsView();
