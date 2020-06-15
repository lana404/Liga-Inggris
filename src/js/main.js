// Style
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// View
import './view/nav-bar.js';
import './view/app-area.js';
//Controll
import {register, notifikasi} from './control/register.js';
// DB
import getAll from './api/get-all.js';

document.addEventListener('DOMContentLoaded',() => {
  // Controll -> Registrasi SW
  register();
  notifikasi();

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
})
