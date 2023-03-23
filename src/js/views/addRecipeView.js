import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');
  #addRecipeOverlay = document.querySelector('.overlay');
  #addRecipeWindow = document.querySelector('.add-recipe-window');

  constructor() {
    super();
    this.addHandlerHideModal();
    this.addHandlerShowModal();
  }

  #toggleRecipeWindow() {
    this.#addRecipeOverlay.classList.toggle('hidden');
    this.#addRecipeWindow.classList.toggle('hidden');
  }

  addHandlerShowModal() {
    this.#btnOpen.addEventListener(
      'click',
      this.#toggleRecipeWindow.bind(this)
    );
  }

  addHandlerHideModal() {
    this.#btnClose.addEventListener(
      'click',
      this.#toggleRecipeWindow.bind(this)
    );
    this.#addRecipeOverlay.addEventListener(
      'click',
      this.#toggleRecipeWindow.bind(this)
    );
  }

  addHandlerUploadRecipe() {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
}

export default new AddRecipeView();
