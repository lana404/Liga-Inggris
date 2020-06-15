import {saveFavorite, deleteFavorite} from '../../db/db.js';

class TeamDetailPage extends HTMLElement {
  constructor() {
    super();
  }

  set data(data) {
    this._data = data;
    this.render();
    this.bookmarkTeam();
  }

  render() {
    console.log(this._data);

    let locationHash = location.hash.substr(1);
    let bookmarkImg = '';
    if (locationHash === 'favorite') {
      bookmarkImg = 'src/img/24/bookmark.svg';
    } else {
      bookmarkImg = 'src/img/24/bookmark-border.svg';
    }

    this.innerHTML = `
            <div class="container">
              <div class="row">
                <a class="" id="bookmark-bt"><img src="${bookmarkImg}" alt="Mark"></a>
              </div>
              <div class="row">
                <div class="col s5 m4 detail-logo">
                  <img src="${this._data.crestUrl}" alt="Logo" class="responsive-img">
                </div>
                <div class="col s7 m8">
                  <h5 class="detail-name"> ${this._data.shortName} </h5>
                </div>
                <div class="col s12 m8">
                  <b> Full Name : </b> ${this._data.name}
                </div>
                <div class="col s12 m8">
                  <b> Stadion : </b> ${this._data.venue}
                </div>
                <div class="col s12 m8">
                  <b> Address : </b> ${this._data.address},  ${this._data.area.name}
                </div>
                <div class="col s12 m8">
                  <b> Phone : </b> ${this._data.phone}
                </div>
                <div class="col s12 m8">
                  <b> Website : </b> ${this._data.website}
                </div>
              </div>
            </div>
    `;
  }

  bookmarkTeam() {
    // Action Saved To Bookmark
    document.getElementById('bookmark-bt').addEventListener('click', event => {
      let locationHash = location.hash.substr(1);
      if (locationHash === 'favorite') {
        deleteFavorite(this._data.id);
      } else {
        saveFavorite(this._data);
      }
    });
  }
}

customElements.define('teamdetail-page', TeamDetailPage);
