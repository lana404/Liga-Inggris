import '../view/pages/teamdetail.js';
import {getByIdSaved} from '../db/db.js';

function getId(funcName, idData) {
  const base_url = 'https://api.football-data.org/v2/';

  const teamdetail = id => {
    if ("caches" in window) {
      caches.match(`${base_url}teams/${id}`)
        .then( response => {
          if (response) {
            response.json()
              .then( responseJson => {
                const appArea = document.querySelector('teamdetail-page');
                appArea.data = responseJson;
              })
          }
        })
        .catch( err => {
          console.log(`Error : ${err}`);
        })
    }

    fetch(`${base_url}teams/${id}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '91ce623ecb4c4a639558576e323fbcd2'
      }
    })
    .then( response => {
      return response.json();
    })
    .then( responseJson => {
      const appArea = document.querySelector('teamdetail-page');
      appArea.data = responseJson;
    })
    .catch( error => {
      console.log(`Error ${error}`);
    });
  }

  const favorite = id => {
    getByIdSaved(id)
      .then( team => {
        const contentArea = document.querySelector('teamdetail-page');
        contentArea.data = team;
      })
      .catch( err => {
        console.log(`Error : ${err}`);
      })
  }

  var funct = eval(funcName);
  funct(idData);
}

export default getId;
