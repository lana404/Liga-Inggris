import getId from '../../api/get-id.js';

class KlasemenPage extends  HTMLElement{
  constructor() {
    super();
  }

  set datas(datas) {
    this._datas = datas;
    this.table();
    this.teamAction();
  }

  table() {
    let page = `
        <div class="container">
          <div class="row">
            <table>
              <thead>
                <tr>
                    <th> No. </th>
                    <th> Klub </th>
                    <th> </th>
                    <th> Ma </th>
                    <th> M </th>
                    <th> S </th>
                    <th> K </th>
                    <th> GM </th>
                    <th> GA </th>
                    <th> SG </th>
                    <th> Poin </th>
                </tr>
              </thead>
            <tbody>
    `;
    this._datas.forEach( data => {
      page += `
          <tr>
            <td> ${data.position} </td>
            <td style="max-width : 50px">
              <img src="${data.team.crestUrl}" class="responsive-img">
            </td>
            <td>
              <a class="team-name" data-team="${data.team.id}"> ${data.team.name} </a>
            </td>
            <td> ${data.playedGames} </td>
            <td> ${data.won} </td>
            <td> ${data.draw} </td>
            <td> ${data.lost} </td>
            <td> ${data.goalsFor} </td>
            <td> ${data.goalsAgainst} </td>
            <td> ${data.goalDifference} </td>
            <td> ${data.points} </td>
          </tr>
      `;
    });

    page += `
            </tbody>
          </table>
        </div>
        <div class="row">
          <b> Keterangan : </b>
          <div class="">
            Ma : Match
          </div>
          <div class="">
            Me : Menang
          <div class="">
            S : Seri
            </div>
          </div>
          <div class="">
            K : Kalah
          </div>
          <div class="">
            GM : Jumlah Gol yang Dicetak
          </div>
          <div class="">
            GA : Jumlah Kebobolan
          </div>
          <div class="">
            SG : Selisih Goal
          </div>
        </div>
      </div>
    `;

    this.innerHTML = page;
  }

  teamAction() {
    document.querySelectorAll('.team-name').forEach( elm => {
      elm.addEventListener('click', event => {
        const teamId = event.target.getAttribute('data-team');
        getId('teamdetail', teamId);
        const appArea = document.querySelector('app-area');
        appArea.page = 'teamdetail';
      })
    });

  }
}

customElements.define('klasemen-page', KlasemenPage);
