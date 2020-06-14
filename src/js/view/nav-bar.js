import menu from './pages/list-menu.js';
import getAll from '../api/get-all.js';
//import loadPage from './load-page.js';

class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderNav();
    this.sidenav();
    this.style();
  }

  renderNav() {
    this.innerHTML = `
      <!-- Navigasi -->
      <nav class="black" role="navigation">
        <div class="nav-wrapper container">
          <a href="#" class="brand-logo"> Liga Inggris </a>
          <a href="#" class="sidenav-trigger" data-target="nav-mobile"> &#9776; </a>

          <!-- Navbar -->
          <ul class="topnav right hide-on-med-and-down"> </ul>
          <!-- Sidenav -->
          <ul class="sidenav" id="nav-mobile"> </ul>
        </div>
      </nav>
    `;
  }

  sidenav() {
    document.querySelectorAll('ul.topnav, ul.sidenav')
      .forEach( elm => {
        elm.innerHTML = menu
      });

    document.querySelectorAll('ul.topnav a, ul.sidenav a')
      .forEach( elm => {
        elm.addEventListener('click', event => {
          const sideNav = document.querySelector('.sidenav');
          M.Sidenav.getInstance(sideNav).close();

          let page = event.target.getAttribute('href').substr(1);
          const appArea = document.querySelector('app-area');
          appArea.page = page;
          getAll(page);
        });
      });
  }

  style() {
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav);
  }
}

customElements.define('nav-bar', NavBar);
