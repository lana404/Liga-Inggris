import '../view/pages/klasemen.js';
import '../view/pages/match.js';
import '../view/pages/home.js';
import '../view/pages/favorite.js';
import {getAllSaved} from '../db/db.js';

function getAll(functName) {
  const baseUrl = 'https://api.football-data.org/v2/';
  const idLiga = '2021';

  const klasemen = () => {
    // Fetch Data from Cache
    if ("caches" in window) {
      caches.match(`${baseUrl}competitions/${idLiga}/standings`)
        .then( response => {
          if (response) {
            response.json()
              .then( responseJson => {
                return responseJson.standings;
              })
              .then( responseStandings => {
                return responseStandings[0].table;
              })
              .then( responseTable => {
                const contentArea = document.querySelector('klasemen-page');
                contentArea.datas = responseTable;
              })
          }
        })
        .catch( err => {
          console.log(`Error : ${err}`);
        })
    }

    // Fetch Data from API
    fetch(`${baseUrl}competitions/${idLiga}/standings`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '91ce623ecb4c4a639558576e323fbcd2'
      }
    })
      .then( response => {
        return response.json();
      })
      .then( responseJson => {
        return responseJson.standings;
      })
      .then( responseStandings => {
        return responseStandings[0].table;
      })
      .then( responseTable => {
        const contentArea = document.querySelector('klasemen-page');
        contentArea.datas = responseTable;
      })
      .catch( err => {
        console.log(`Error : ${err}`);
      })
  };

  const match = () => {
    // Fetch Data from Cache
    if ("caches" in window) {
      caches.match(`${baseUrl}competitions/${idLiga}/matches`)
        .then( response => {
          if (response) {
            response.json()
              .then( responseJson => {
                return responseJson.matches;
              })
              .then( responseMatches => {
                const contentArea = document.querySelector('match-page');
                contentArea.data = responseMatches;
              })
          }
        })
        .catch( err => {
          console.log(`Error : ${err}`);
        })
    }

    // Fetch Data from API
    fetch(`${baseUrl}competitions/${idLiga}/matches`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '91ce623ecb4c4a639558576e323fbcd2'
      }
    })
      .then( response => {
        return response.json();
      })
      .then( responseJson => {
        return responseJson.matches;
      })
      .then( responseMatches => {
        const contentArea = document.querySelector('match-page');
        contentArea.data = responseMatches;
      })
      .catch( err => {
        console.log(`Error : ${err}`);
      })
  };

  const home = () => {
    // Coming Soon
  }

  const favorite = () => {
    getAllSaved()
      .then( team => {
        const contentArea = document.querySelector('favorite-page');
        contentArea.data = team;
      })
      .catch( err => {
        console.log(`Error : ${err}`);
      })
  }

  // Dinamyc Call Function
  let funct = eval(functName);
  funct();
}

export default getAll;
