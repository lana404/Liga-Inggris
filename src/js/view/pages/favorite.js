import getId from '../../api/get-id.js';

class FavoritePage extends HTMLElement {
  constructor() {
    super();
  }

  set data(data) {
    this._data = data;
    this.render();
    this.favoriteAction();
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
    let page;

    if (this._data.length !== 0) {
      console.log(this._data);
      page = `<div class="container">`;
      this._data.forEach( data => {
        page += `
              <div class="col s12 m7">
                <div class="card horizontal">
                  <div class="card-image" style="max-width : 5em; padding-left: 5px;">
                    <img src="${data.crestUrl}"/>
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <a class="team-name" data-team="${data.id}"> ${data.name} </a>
                    </div>
                  </div>
                </div>
              </div>
        `;
      });

      page +=`
        </div>
      `;
    } else {
      page = `
        <div class="center-loader">
          Tidak ada yang disimpan
        </div>
      `;
    }

    this.innerHTML = page;
  }

  favoriteAction() {
    document.querySelectorAll('.team-name').forEach( elm => {
      elm.addEventListener('click', event => {
        const team = event.target.getAttribute('data-team');
        getId('favorite', team);
        const appArea = document.querySelector('app-area');
        appArea.page = 'teamdetail';
      })
    });
  }
}

customElements.define('favorite-page', FavoritePage);
