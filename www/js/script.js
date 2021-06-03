
/* gets the data from /getSport url and creates a list of cards with sport names */
var getURL = '/getSport';
var sportList = document.querySelector('#sportList');
fetch(getURL)
    .then(res => res.json())
    .then((data) =>{
        var datafeed = data.map((sport) =>{
          return `	
          <div class="col m5 offset-s2">
          <div class="card white">
            <div class="card-content white">
              <span class="card-title">${sport.name}</span>
              <p></p>
            </div>
            <div class="card-action">
              <a class="waves-effect waves-light btn deep-purple lighten-2" style=" width: 100%" href="/courts/${sport._id}"> find a court </a>
            </div>
          </div>
        </div> ` 
        }) .join('');
        sportList.innerHTML = datafeed;
      });

     