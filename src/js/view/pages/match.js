import moment from 'moment';

class NextMatchPage extends HTMLElement {
  constructor() {
    super();
  }

  set data(data) {
    this._data = data;
    this.scheduled();
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

  scheduled() {
    console.log(this._data);
    // Init Page
    let page = '';
    this._data.forEach( data => {
      let tanggal = moment(data.utcDate).format('D MMMM YYYY, h:mm');
      if (data.status === 'SCHEDULED') {
        page += `
            <div class="container">
              <div class="row">
                <div class="col s12 m12 l12">
                  ${tanggal}
                </div>
                <div class="row">
                  <div class="col s12 m12 l5">
                    <div class="card-panel grey lighten-5">
                      ${data.awayTeam.name}
                    </div>
                  </div>
                  <div class="col s12 m12 l2">
                    <div class='vs'>
                      VS
                    </div>
                  </div>
                  <div class="col s12 m12 l5">
                    <div class="card-panel grey lighten-5">
                      ${data.homeTeam.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
      }
    });

    this.innerHTML = page;
  }

  style() {
    const datePicker = document.querySelector('.datepicker');
    M.Datepicker.init(datePicker, {format: 'dd mmmm yyyy'});
  }
}

customElements.define('match-page', NextMatchPage);
