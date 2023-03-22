import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newAllElements = Array.from(newDOM.querySelectorAll('*'));
    const curAllElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newAllElements.forEach((newElm, i) => {
      const curElm = curAllElements[i];

      // Updating changed TEXT
      if (
        !newElm.isEqualNode(curElm) &&
        newElm.firstChild?.nodeValue.trim() !== ''
      ) {
        curElm.textContent = newElm.textContent;
      }

      // Updating changed ATTRIBUTES
      if (!newElm.isEqualNode(curElm)) {
        Array.from(newElm.attributes).forEach((attr) =>
          curElm.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const spinnerHtml = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerHtml);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
