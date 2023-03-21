import View from './View.js';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again.`;
}

export default new SearchResultsView();
