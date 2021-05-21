document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  document.addEventListener('DOMContentLoaded', ()=> {

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var dateAddModal = document.querySelector('#dateAddModal');
    var dateSelect = M.Modal.getInstance(dateAddModal);

    var calendarEl = document.querySelector('#calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: function(info) {
        var dateField = document.querySelector('#date');
        dateField.value = info.dateStr;
        dateSelect.open();
      }
    });
    calendar.render();
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    var map = L.map('map').setView([50.37566179067675, -4.139420986175538], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2tvd3I4ODhwMDh0dDJvbXBmczAxa2llbiJ9.0zANEIsOOToA_A7N_m5jXw'
        }).addTo(map); });

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
              <a class="waves-effect waves-light btn deep-purple lighten-2" href="SportPage.html"> find a court </a>
            </div>
          </div>
        </div> ` 
        }) .join('');
        sportList.innerHTML = datafeed;
      });
