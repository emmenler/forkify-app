import View from './View.js';

class AddRecipeView {
  _parentElement = document.querySelector('.upload');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnCLose = document.querySelector('.btn--close-modal');
  _addRecipeOverlay = document.querySelector('.overlay');
  _addRecipeWindow = document.querySelector('.add-recipe-window');

  toggleRecipeWindow() {
    console.log('toggle');
    this._addRecipeOverlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
  }

  addHandlerShowModal() {
    this._btnOpen.addEventListener('click', this.toggleRecipeWindow.bind(this));
  }

  addHandlerHideModal() {
    this._btnCLose.addEventListener(
      'click',
      this.toggleRecipeWindow.bind(this)
    );
    this._addRecipeOverlay.addEventListener(
      'click',
      this.toggleRecipeWindow.bind(this)
    );
  }
}

export default new AddRecipeView();
