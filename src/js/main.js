// Style
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// View
import './view/nav-bar.js';
import './view/app-area.js';
//Controll Register
import register from './control/register.js';
import getAll from './api/get-all.js';

document.addEventListener('DOMContentLoaded',() => {
  // View
  let page = location.hash.substr(1);
  if (page === '') {
    page = 'home';
  } else if (page === 'team') {
    page = 'favorite';
  }

  const appArea = document.querySelector('app-area');
  appArea.page = page;
  getAll(page);

  // Controll -> Registrasi SW
  register();
})
