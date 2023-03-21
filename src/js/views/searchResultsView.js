import View from './View.js';
import icons from 'url:../../img/icons.svg';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again.`;

  _generateMarkup() {
    return this._data
      .map((result) => {
        return this.#generateMarkupPreviews(result);
      })
      .join('');
  }

  #generateMarkupPreviews(result) {
    return `
        <li class="preview">
          <a class="preview__link preview__link--active" href="${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
    `;
  }
}

export default new SearchResultsView();
