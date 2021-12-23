import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  /**
   * Render the recived obj to the DOM
   * @param {Object | Object[]} data  The data to be render
   */
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
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Update change text in node
      // console.log(curEl, newEl, curEl.isEqualNode(newEl), newEl.firstChild);
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Update change attribute in node
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
               <div class="spinner">
                 <svg>
                   <use href="${icons}#icon-loader"></use>
                 </svg>
               </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errormessage) {
    const markup = `
               <div class="error">
                   <div>
                   <svg>
                       <use href="${icons}.svg#icon-alert-triangle"></use>
                   </svg>
                   </div>
                   <p>${message}</p>
               </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
               <div class="message">
                   <div>
                   <svg>
                       <use href="${icons}.svg#icon-smile"></use>
                   </svg>
                   </div>
                   <p>${message}</p>
               </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
