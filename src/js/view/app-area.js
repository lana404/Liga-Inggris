import './pages/home.js';
import './pages/klasemen.js';
import './pages/match.js';
import './pages/favorite.js';
import './pages/teamdetail.js';

class AppArea extends HTMLElement {
  constructor() {
    super();
  }

  set page(page) {
    this._page = page;
    this.render();
  }

  render() {
    this.innerHTML = '';
    const contentElement = document.createElement(`${this._page}-page`);
    this.appendChild(contentElement);
  }
}

customElements.define('app-area', AppArea);
