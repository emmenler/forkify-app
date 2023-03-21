class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.document.querySelector('.search__field').value;
  }
}

export default new SearchView();
