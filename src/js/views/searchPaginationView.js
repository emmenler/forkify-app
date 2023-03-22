import View from './View.js';
class SearchPaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.floor(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // 1. First page, only button to move forward
    // 2. Last page, only button to move backward
    // 3. Less that RES_PER_PAGE previews on page, no buttons
    // 4. Both buttons are present
  }
}

export default new SearchPaginationView();
