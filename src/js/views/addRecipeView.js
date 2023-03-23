import View from './View.js';

class AddRecipeView {
  _parentElement = document.querySelector('.upload');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');
  #addRecipeOverlay = document.querySelector('.overlay');
  #addRecipeWindow = document.querySelector('.add-recipe-window');

  #toggleRecipeWindow() {
    console.log('toggle');
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
}

export default new AddRecipeView();
