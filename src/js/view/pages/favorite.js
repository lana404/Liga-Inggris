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

  render() {
    console.log(this._data);

    let page = `<div class="container">`;
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
