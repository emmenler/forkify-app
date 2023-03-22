import View from './View.js';
class SearchPaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages, this._data.page);
    // 1. First page, only button to move forward
    if (this._data.page === 1 && numPages > 1) {
      return 'first page, with others';
    }
    // 2. Last page, only button to move backward
    if (this._data.page === numPages && numPages > 1) {
      return 'last page, with others';
    }
    // 3. Both buttons are present
    if (this._data.page < numPages) {
      return 'other page';
    }
    // 4. Less that RES_PER_PAGE previews on page, no buttons
    return 'only one page';
  }
}

export default new SearchPaginationView();
