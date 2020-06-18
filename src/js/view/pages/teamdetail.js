import {saveFavorite, getByIdSaved, deleteFavorite} from '../../db/db.js';

class TeamDetailPage extends HTMLElement {
  constructor() {
    super();
  }

  set data(data) {
    this._data = data;
    this.render();
    this.floatingBt();
    this.btAction();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="center-loader">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-black-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    console.log(this._data);

    this.innerHTML = `
            <div class="container">
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
              <div id="floating-bt" class="row">
              </div>
            </div>
    `;
  }

  floatingBt() {
    getByIdSaved(this._data.id)
      .then( data => {
        const floatingBt = document.getElementById('floating-bt');

        if (data) {
          console.log("Team sudah disimpan");
          floatingBt.innerHTML = `
            <a class="btn-floating btn-large waves-effect waves-light red" id="btDelete"><img src="./src/img/24/delete.svg" alt="del"></a>
          `;
        } else {
          console.log("Team belom disimpan");
          floatingBt.innerHTML = `
            <a class="btn-floating btn-large waves-effect waves-light red" id="btAdd"><img src="./src/img/24/add.svg" alt="add"></a>
          `;
        }
      })
      .catch( err => {
        console.log(`Error ${err}`);
      })
  }

  btAction() {
    getByIdSaved(this._data.id)
      .then( data => {
        if (data) {
          document.getElementById('btDelete').addEventListener('click', () => {
            deleteFavorite(this._data.id);
          })
        } else {
          document.getElementById('btAdd').addEventListener('click', () => {
            saveFavorite(this._data);
          })
        }
      });
  }
}

customElements.define('teamdetail-page', TeamDetailPage);
